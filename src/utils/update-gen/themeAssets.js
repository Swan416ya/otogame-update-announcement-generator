/**
 * 更新图生成器的「主题级素材库」
 *
 * 旧逻辑是打开页面就把所有主题的图全部预加载（中二 21MB + 舞萌 69MB + 字体 24MB），
 * 首次可用要等这一大坨资源。现在改成：
 *  - 打开时只加载当前主题（游戏 + 版本）真正需要的图；
 *  - 切主题时才补该主题缺的那几张，之前主题的图不清、永久留在内存里，切回立即出图；
 *  - 同一个 URL 全局只请求一次（跨主题共用的卡片 / 徽章 / SEGA 不重复下载）；
 *  - 每张图到达就通知视图，可以渐进重绘，不用等整批。
 *
 * 素材清单由各渲染器自己声明（chuni.js 的 chuniThemeAssets / mai.js 的 maiThemeAssets），
 * 条目格式统一为 { url, path }：path 是写入图片池的路径，字符串键写对象、数字键写数组下标。
 *
 * 这个模块顶层的 store 是单例：路由来回切换不会丢已加载的图（只要没刷新页面）。
 */
import newRodinUrl from '@/assets/update-gen/fonts/NewRodinPro-B.woff2'
import miSansUrl from '@/assets/update-gen/fonts/MiSans-Regular.woff2'
import udKakugoEUrl from '@/assets/update-gen/fonts/UDKakugo-E.otf'
import udKakugoHUrl from '@/assets/update-gen/fonts/UDKakugo-H.otf'
import newRodinEbUrl from '@/assets/update-gen/fonts/NewRodinPro-EB.otf'
import udShinGoScUrl from '@/assets/update-gen/fonts/UDShinGoSC-B.woff2'

/* ===================== 图片池 ===================== */

/**
 * 渲染器读取的图片池形状（路径与 chuni.js / mai.js 里的 imgs.xxx 一一对应）。
 * 各分类下的具体 key 由素材清单在加载时按需填充。
 */
export function createImageBanks() {
  const banks = {
    // 中二
    bgs: {},
    logos: {},
    chuniTitleTextures: {},
    // 舞萌
    logosMai: {},
    bgsMai: {},
    maiBands: {},
    maiUnivCards: {},
    maiEarly: {},
    maiEarlyBgs: {},
    maiSplashCards: [],
    maiMagicalCards: {},
    maiPsd: {
      magical: {},
      circleplus: {},
      circle: {},
      universe: {},
      festival: {},
      festivalplus: {},
      buddies: {},
      buddiesplus: {},
      prism: {},
      prismplus: {}
    },
    // 单图槽位（中二共用素材）
    topBar: null,
    bottomBar: null,
    cardBg: null,
    cardBgUltima: null,
    cardBgLegacy: null,
    cardBgUltimaLegacy: null,
    bandLegacy: null,
    logoSega: null,
    // 单图槽位（舞萌）
    maiSega: null,
    maiBadge: null,
    maiCnLogo: null,
    maiCnDxLogo: null,
    maiCn2021Logo: null,
    maiCn2022Logo: null,
    maiCn2023Logo: null,
    maiCn2024Logo: null,
    maiCn2025Logo: null,
    maiCn2027Logo: null
  }
  // 兼容旧别名：PSD 家族素材库原先挂在 imgs.maiMagical / maiCircle / maiCircleplus 上
  for (const alias of ['magical', 'circleplus', 'circle']) {
    Object.defineProperty(banks, `mai${alias[0].toUpperCase()}${alias.slice(1)}`, {
      get: () => banks.maiPsd[alias],
      enumerable: false
    })
  }
  return banks
}

/** 1×1 透明占位：个别图挂了也让 drawImage 有东西可画，不炸整个渲染 */
const fallbackImg = (() => {
  if (typeof document === 'undefined') return { width: 0, height: 0 }
  const c = document.createElement('canvas')
  c.width = c.height = 1
  return c
})()

function setAt(root, path, value) {
  let node = root
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]
    if (node[key] == null) node[key] = typeof path[i + 1] === 'number' ? [] : {}
    node = node[key]
  }
  node[path[path.length - 1]] = value
}

/**
 * 创建素材库实例（一般用下面的 getAssetStore() 单例即可）。
 * @param {{ onLoad?: (url: string) => void }} [opts]
 */
export function createThemeAssetStore(opts = {}) {
  /** url → Promise<HTMLImageElement>：全局去重，跨主题共享素材只下载一次 */
  const cache = new Map()
  /** 已经到位的 url */
  const ready = new Set()
  const listeners = new Set()
  const imgs = createImageBanks()
  if (opts.onLoad) listeners.add(opts.onLoad)

  function emit(url) {
    for (const fn of listeners) {
      try {
        fn(url)
      } catch {
        /* 单个监听器出错不影响加载 */
      }
    }
  }

  function loadUrl(url) {
    if (!url) return Promise.resolve(fallbackImg)
    let p = cache.get(url)
    if (!p) {
      p = new Promise((resolve) => {
        const done = (im) => {
          ready.add(url)
          resolve(im)
        }
        const img = new Image()
        img.onload = () => done(img)
        // 失败静默重试一次；再失败给透明占位——绝不让 Promise 挂起或 reject
        img.onerror = () => {
          const retry = new Image()
          retry.onload = () => done(retry)
          retry.onerror = () => done(fallbackImg)
          retry.src = url + (url.includes('?') ? '&' : '?') + 'retry=1'
        }
        img.src = url
      })
      cache.set(url, p)
    }
    return p
  }

  /**
   * 确保这批素材已经加载并写入图片池。重复调用只补缺的，已经有的立即返回。
   * @param {Array<{ url: string, path: Array<string|number> }>} entries
   */
  function ensure(entries) {
    if (!entries || !entries.length) return Promise.resolve()
    const seen = new Set()
    const jobs = []
    for (const entry of entries) {
      if (!entry || !entry.url || !entry.path) continue
      // 同一个 URL 在同一批里只需要写一次（不同 path 也各自写）
      const jobKey = entry.url + '\u0000' + entry.path.join('.')
      if (seen.has(jobKey)) continue
      seen.add(jobKey)
      jobs.push(
        loadUrl(entry.url).then((im) => {
          setAt(imgs, entry.path, im)
          emit(entry.url)
          return im
        })
      )
    }
    return Promise.all(jobs)
  }

  /** 主背景是否已到位（视图据此决定能不能重绘当前主题） */
  function isReady(url) {
    return !!url && ready.has(url)
  }

  /** 这批素材里已经到位几张 / 共几张（给「正在加载 3/9」用） */
  function progress(entries) {
    const urls = new Set((entries || []).map((e) => e && e.url).filter(Boolean))
    let done = 0
    for (const url of urls) if (ready.has(url)) done++
    return { done, total: urls.size }
  }

  return {
    imgs,
    ensure,
    isReady,
    progress,
    loadUrl,
    subscribe(fn) {
      listeners.add(fn)
      return () => listeners.delete(fn)
    }
  }
}

let singleton = null
/** 页面级单例：路由切换回来时已加载的图还在，不重复下载 */
export function getAssetStore() {
  if (!singleton) singleton = createThemeAssetStore()
  return singleton
}

/* ===================== 字体 ===================== */

/** 逻辑字体 → 需要注册的 FontFace 列表（同一逻辑字体只会注册一次） */
const FONT_DEFS = {
  // 中二 / 舞萌共用的正文与标题字体
  newRodinB: [{ family: 'NewRodin', url: newRodinUrl, weight: '400 900' }],
  udShinGo: [
    { family: 'UDShinGo SC', url: udShinGoScUrl, weight: '700' },
    { family: 'UDShinGo SC', url: udShinGoScUrl, weight: '900' }
  ],
  miSans: [{ family: 'MiSans', url: miSansUrl, weight: '400' }],
  // 舞萌卡片/标题的无衬线粗体（中二旧版标题的兜底也用这一套）
  newRodinEB: [
    { family: 'FOT-NewRodin Pro', url: newRodinEbUrl, weight: '900' },
    { family: 'FOT-NewRodin Pro', url: newRodinUrl, weight: '700' }
  ],
  // 只在 DX 初代主题里作为缺字兜底，11.5MB，不随首屏加载
  kakugo: [
    { family: 'FOT-UDKakugo_Large Pr6N', url: udKakugoEUrl, weight: '700' },
    { family: 'FOT-UDKakugo_Large Pr6N', url: udKakugoHUrl, weight: '900' }
  ]
}

const fontPromises = new Map()

/**
 * 按需注册并下载字体（同一 id 只做一次；不阻塞首帧，字体到位后视图再补一帧）。
 * @param {string[]} ids
 */
export function ensureFonts(ids) {
  const jobs = []
  for (const id of ids || []) {
    if (!FONT_DEFS[id]) continue
    if (!fontPromises.has(id)) {
      const p = Promise.allSettled(
        FONT_DEFS[id].map((def) =>
          new FontFace(def.family, `url(${def.url})`, { weight: def.weight })
            .load()
            .then((face) => {
              document.fonts.add(face)
              return face
            })
        )
      )
      fontPromises.set(id, p)
    }
    jobs.push(fontPromises.get(id))
  }
  return Promise.all(jobs)
}
