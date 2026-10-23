<template>
  <div class="ug-page">
    <!-- 顶部导航：返回 + 标题 -->
    <header class="ug-nav">
      <a href="https://swan416.top/toys" class="ug-back">
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path fill="currentColor" d="M15.5 4.5 8 12l7.5 7.5 1.4-1.4L10.8 12l6.1-6.1z" />
        </svg>
        <span>回 Toys</span>
      </a>
      <span class="ug-brand">音游更新图生成器</span>
      <a class="ug-gh" href="https://github.com/Swan416ya" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path fill="currentColor" d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 2.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
        </svg>
      </a>
    </header>

    <div class="ug-app">
      <!-- ============ 左侧编辑面板 ============ -->
      <aside class="ug-editor">
        <!-- 游戏 -->
        <section class="ug-group">
          <div class="ug-tabs">
            <button type="button" class="ug-tab" :class="{ on: game === 'chuni' }" @click="game = 'chuni'">中二节奏</button>
            <button type="button" class="ug-tab" :class="{ on: game === 'mai' }" @click="game = 'mai'">舞萌DX</button>
          </div>
        </section>

        <!-- 版本 -->
        <section class="ug-group">
          <label class="ug-label" for="ug-version">版本</label>
          <select id="ug-version" v-model="version">
            <option v-for="(v, k) in versionList" :key="k" :value="k">{{ v.label }}</option>
          </select>
        </section>

        <!-- Splash 两种官方公告背景：黄色热带款 / 米白竖条纹款。 -->
        <section v-if="game === 'mai' && version === 'splash'" class="ug-group">
          <label class="ug-check">
            <input v-model="splashAltBg" type="checkbox" />
            切换为米白条纹背景
          </label>
        </section>

        <!-- FESTiVAL / FESTiVAL PLUS 共用版式，只替换左上版本 logo。 -->
        <section v-if="game === 'mai' && version === 'festival'" class="ug-group">
          <label class="ug-label" for="ug-festival-logo">Logo</label>
          <select id="ug-festival-logo" v-model="festivalLogoVariant">
            <option value="jp">日服 FESTiVAL</option>
            <option value="plus">日服 FESTiVAL PLUS</option>
            <option value="cn2023">国服 舞萌DX 2023</option>
          </select>
        </section>

        <!-- UNiVERSE / UNiVERSE PLUS 共用背景和卡片，只替换版本 logo。 -->
        <section v-if="game === 'mai' && version === 'universe'" class="ug-group">
          <label class="ug-label" for="ug-universe-logo">Logo</label>
          <select id="ug-universe-logo" v-model="universeLogoVariant">
            <option value="base">日服 UNiVERSE</option>
            <option value="plus">日服 UNiVERSE PLUS</option>
          </select>
        </section>

        <!-- 顶部文字 -->
        <section class="ug-group">
          <label class="ug-label" for="ug-title">顶部标题</label>
          <textarea id="ug-title" v-model="title" rows="2" placeholder="例如：&#10;8月2日 乐曲追加！"></textarea>
        </section>

        <!-- 追加乐曲 -->
        <section class="ug-group">
          <div class="ug-group-head">
            <span class="ug-label">追加乐曲（{{ Math.min(songs.length, songLimit) }}/{{ songLimit }}）</span>
            <button type="button" class="ug-btn ug-btn--small" :disabled="songs.length >= songLimit" @click="addSong">+ 添加</button>
          </div>
          <div class="ug-songs">
            <div v-for="(s, i) in songs" :key="s.id" class="ug-song">
              <div class="ug-song__head">
                <span class="ug-song__idx">#{{ String(i + 1).padStart(2, '0') }}</span>
                <label v-if="game === 'chuni'" class="ug-song__ultima" :class="{ on: s.ultima }">
                  <input v-model="s.ultima" type="checkbox" /> ULTiMA
                </label>
                <button type="button" class="ug-song__del" title="删除" @click="removeSong(s.id)">×</button>
              </div>
              <div class="ug-song__art">
                <img class="ug-song__thumb" :src="s.art || ''" alt="" />
                <div class="ug-song__art-btns">
                  <input
                    type="url"
                    placeholder="曲绘 URL（需允许跨域）"
                    :value="s.artUrlRaw"
                    @input="onArtUrl(s, $event.target.value)"
                  />
                  <button type="button" class="ug-btn ug-btn--small" title="从本机选图：只在这个浏览器里读取，不会上传到任何服务器" @click="pickFile(s)">本地图片</button>
                  <input ref="fileInputs" type="file" accept="image/*" hidden @change="onFile(s, $event)" />
                </div>
              </div>
              <div v-if="game === 'mai'" class="ug-song__colors">
                <button
                  v-for="p in maiPalette"
                  :key="p.idx"
                  type="button"
                  class="ug-swatch"
                  :class="{ on: s.frameIndex === p.idx }"
                  :style="{ background: p.color }"
                  @click="s.frameIndex = s.frameIndex === p.idx ? null : p.idx"
                />
              </div>
              <textarea v-model="s.name" class="ug-song__text" rows="1" placeholder="曲名（回车换行）" @input="autoGrow"></textarea>
              <textarea v-model="s.artist" class="ug-song__text" rows="1" placeholder="作曲 / 艺术家（最多2行）" @input="autoGrow"></textarea>
            </div>
            <p v-if="!songs.length" class="ug-empty">还没有曲目，点「+ 添加」开始。</p>
          </div>
        </section>

        <!-- 徽章开关（舞萌：≥5 首的版式官方一律不带；1–4 首可手动关掉） -->
        <section v-if="game === 'mai' && version !== 'splashplus' && version !== 'universe' && !(version === 'festival' && festivalLogoVariant === 'cn2023')" class="ug-group">
          <label class="ug-check">
            <input type="checkbox" v-model="showBadge" :disabled="songs.length >= 5" />
            显示官方徽章（NEW! すぐに遊べる新曲！ / N曲まとめて）
          </label>
        </section>

        <!-- DX 初代三种地区/小版本共用一套版式，只切换右上 logo -->
        <section v-if="game === 'mai' && version === 'deradx'" class="ug-group">
          <label class="ug-label" for="ug-dx-logo">Logo</label>
          <select id="ug-dx-logo" v-model="dxLogoVariant">
            <option value="jp">日服 DX 初代</option>
            <option value="plus">日服 DX PLUS</option>
            <option value="cn">国服 舞萌DX 初代</option>
            <option value="cn2021">国服 舞萌DX 2021</option>
            <option value="cn2022">国服 舞萌DX 2022</option>
          </select>
        </section>

        <!-- BUDDiES / PRiSM / PRiSM PLUS / CiRCLE：左上角 logo 可切换为对应国服版 -->
        <section v-if="game === 'mai' && (version === 'buddies' || version === 'prism' || version === 'prismplus' || version === 'circle')" class="ug-group">
          <label class="ug-check">
            <input type="checkbox" v-model="useCnLogo" />
            使用国服 logo（{{ version === 'buddies' ? '舞萌DX 2024' : version === 'prism' ? '舞萌DX 2025' : version === 'prismplus' ? '舞萌DX 2026' : '舞萌DX 2027' }}）
          </label>
        </section>

        <!-- 版权 -->
        <section class="ug-group">
          <label class="ug-label" for="ug-credit">左下角版权文字</label>
          <textarea id="ug-credit" v-model="credit" rows="2" placeholder="©SEGA（联动曲可改）"></textarea>
        </section>

        <!-- 导出 -->
        <section class="ug-group ug-actions">
          <button type="button" class="ug-btn ug-btn--primary" @click="downloadPng">下载 PNG</button>
          <button type="button" class="ug-btn" @click="copyPng">复制图片</button>
        </section>

        <p class="ug-status" :class="statusType">{{ status }}</p>
      </aside>

      <!-- ============ 右侧预览 ============ -->
      <main class="ug-preview">
        <div class="ug-frame" :style="{ aspectRatio: `${canvasSize.width} / ${canvasSize.height}` }">
          <canvas ref="canvasRef" :width="canvasSize.width" :height="canvasSize.height"></canvas>
        </div>
        <p class="ug-tip">预览为 {{ canvasSize.width }}×{{ canvasSize.height }} 等比缩放，导出按 2× 高清渲染。曲绘只在本机浏览器读取转换，不会上传到任何服务器。</p>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { CHUNI_VERSIONS, renderChuni } from '@/utils/update-gen/chuni'
import { MAI_VERSIONS, MAI_PALETTES, MAI_UNIV_CARD_URLS, MAI_BAND_URLS, MAI_ASSET_URLS, MAI_CN_LOGO_URL, MAI_CN_DX_LOGO_URL, MAI_CN_2021_LOGO_URL, MAI_CN_2022_LOGO_URL, MAI_CN_2023_LOGO_URL, MAI_CN_2024_LOGO_URL, MAI_CN_2025_LOGO_URL, MAI_CN_2027_LOGO_URL, MAI_EARLY_URLS, MAI_EARLY_BG_URLS, MAI_SPLASH_CARD_URLS, MAI_MODERN_BG_URLS, MAI_MODERN_HEADER_URLS, MAI_MODERN_DECO_URLS, MAI_MAGICAL_URLS, MAI_CIRCLEPLUS_URLS, MAI_CIRCLE_URLS, MAI_MAGICAL_CARD_URLS, renderMai } from '@/utils/update-gen/mai'
import '@fontsource/noto-sans-sc/700.css'
import '@fontsource/noto-sans-sc/900.css'
import '@fontsource/noto-sans-jp/600.css'
import '@fontsource/noto-sans-jp/900.css'
import '@fontsource/noto-sans-jp/400.css'
import '@fontsource/m-plus-rounded-1c/800.css'
import '@fontsource/m-plus-rounded-1c/900.css'
import newRodinUrl from '@/assets/update-gen/fonts/NewRodinPro-B.woff2'
import miSansUrl from '@/assets/update-gen/fonts/MiSans-Regular.woff2'
import udKakugoEUrl from '@/assets/update-gen/fonts/UDKakugo-E.otf'
import udKakugoHUrl from '@/assets/update-gen/fonts/UDKakugo-H.otf'
import newRodinEbUrl from '@/assets/update-gen/fonts/NewRodinPro-EB.otf'
import udShinGoScUrl from '@/assets/update-gen/fonts/UDShinGoSC-B.woff2'

/* 舞萌卡片模板/横幅/SEGA/徽章 URL 均由 mai.js 导出（官方图抠取） */
const maiLogoModules = import.meta.glob('@/assets/update-gen/mai/logo-*.png', { eager: true, import: 'default' })
const maiLogoUrls = {}
for (const [path, url] of Object.entries(maiLogoModules)) {
  const m = path.match(/logo-(\w+)\.png$/)
  if (m) maiLogoUrls[m[1]] = url
}
// BUDDiES 两版使用已清理白底/外发光、保留官方白色贴边的新素材。
maiLogoUrls.buddies = MAI_VERSIONS.buddies.logo
maiLogoUrls.buddiesplus = MAI_VERSIONS.buddiesplus.logo
import topBarUrl from '@/assets/update-gen/chuni/top-bar.webp'
import bottomBarUrl from '@/assets/update-gen/chuni/bottom-bar.png'
import cardBgUrl from '@/assets/update-gen/chuni/card-bg.webp'
import cardBgUltimaUrl from '@/assets/update-gen/chuni/card-bg-ultima.png'
import cardBgLegacyUrl from '@/assets/update-gen/chuni/card-bg-legacy.png'
import cardBgUltimaLegacyUrl from '@/assets/update-gen/chuni/card-bg-ultima-legacy.png'
import bandLegacyUrl from '@/assets/update-gen/chuni/band-legacy.jpg'
import logoSegaUrl from '@/assets/update-gen/chuni/logo-sega.svg'

const CHUNI_ASSET_URLS = { topBar: topBarUrl, bottomBar: bottomBarUrl, cardBg: cardBgUrl, cardBgUltima: cardBgUltimaUrl, cardBgLegacy: cardBgLegacyUrl, cardBgUltimaLegacy: cardBgUltimaLegacyUrl, bandLegacy: bandLegacyUrl, logoSega: logoSegaUrl }

/* ---------- 状态 ---------- */
const game = ref('chuni')
const version = ref('mate')
const title = ref('8月2日 乐曲追加！')
const credit = ref('©SEGA')
const songs = reactive([])
const showBadge = ref(true)
const splashAltBg = ref(false)
const useCnLogo = ref(false)
const dxLogoVariant = ref('jp')
const festivalLogoVariant = ref('jp')
const universeLogoVariant = ref('base')
const status = ref('')
const statusType = ref('')
const canvasRef = ref(null)
const fileInputs = ref([])
const canvasSize = computed(() => game.value === 'chuni' && (version.value === 'amazon' || version.value === 'amazon-plus')
  ? { width: 1440, height: 1080 }
  : { width: 1920, height: 1080 })
let songSeq = 0

const isDev = import.meta.env.DEV || (typeof location !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(location.hostname))
/* 线上放行的舞萌主题（DX 初代/PLUS、PRiSM/PRiSM PLUS 与 PSD 校准过的 MAGiCAL 三版） */
const MAI_LAUNCH_KEYS = ['deradx', 'splash', 'splashplus', 'universe', 'festival', 'buddies', 'buddiesplus', 'prism', 'prismplus', 'circle', 'circleplus', 'magical']
const versionList = computed(() => {
  if (game.value === 'chuni') return CHUNI_VERSIONS
  const out = {}
  const keys = isDev ? Object.keys(MAI_VERSIONS).filter((k) => k !== 'festivalplus' && k !== 'universeplus') : MAI_LAUNCH_KEYS
  for (const k of keys) if (MAI_VERSIONS[k]) out[k] = MAI_VERSIONS[k]
  return out
})
const maiPalette = computed(() => MAI_PALETTES[MAI_VERSIONS[version.value]?.family || 'festival'])
const OLD_CHUNI_VERSIONS = new Set(['amazon', 'amazon-plus', 'crystal', 'crystal-plus', 'paradise', 'paradise-lost'])
const songLimit = computed(() => game.value === 'chuni' && OLD_CHUNI_VERSIONS.has(version.value) ? 9 : 10)
const renderSongs = computed(() => songs.slice(0, songLimit.value))

/* 切游戏时把版本切到该游戏的最新版本（列表末项，与中二 mate 默认一致） */
watch(game, () => {
  const keys = Object.keys(versionList.value)
  version.value = keys[keys.length - 1]
  if (game.value === 'mai') ensureMaiAssets()
  scheduleRender()
})

function addSong() {
  if (songs.length >= songLimit.value) return
  songs.push({ id: ++songSeq, name: '', artist: '', art: '', artUrlRaw: '', ultima: false, frameIndex: null })
}
function removeSong(id) {
  const i = songs.findIndex((s) => s.id === id)
  if (i >= 0) songs.splice(i, 1)
}

/* ---------- 曲绘录入：URL 当场转 dataURL（CORS 不通过直接拒绝，保证导出永不被污染） ---------- */
let statusTimer = null
function setStatus(msg, type) {
  status.value = msg
  statusType.value = type || ''
  clearTimeout(statusTimer)
  if (msg) statusTimer = setTimeout(() => (status.value = ''), 4000)
}

async function onArtUrl(song, url) {
  song.artUrlRaw = url
  song.art = ''
  song.artImg = null
  const u = url.trim()
  if (!u) return
  // 25s 上限：海外图床常常一直挂着（不报错也不返回），不能让用户干等
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 25000)
  try {
    const r = await fetch(u, { mode: 'cors', signal: ctrl.signal })
    if (!r.ok) throw new Error('HTTP ' + r.status)
    const blob = await r.blob()
    const dataUrl = await new Promise((res, rej) => {
      const fr = new FileReader()
      fr.onload = () => res(fr.result)
      fr.onerror = rej
      fr.readAsDataURL(blob)
    })
    song.art = dataUrl
    loadArtImg(song, dataUrl)
    setStatus('曲绘已读入（浏览器本地转换，未上传服务器）', 'ok')
  } catch (e) {
    song.artUrlRaw = ''
    if (e && e.name === 'AbortError') {
      setStatus('这个图片地址 25 秒没有响应（海外图床常见），请先存到本地再用「本地图片」', 'err')
    } else {
      setStatus('这个图床不允许跨域访问，导出会失败。请把图片存到本地后用「本地图片」。', 'err')
    }
  } finally {
    clearTimeout(timer)
  }
}

function pickFile(song) {
  const inputs = fileInputs.value
  const input = Array.isArray(inputs) ? inputs[songs.indexOf(song)] : inputs
  if (input) input.click()
}
function onFile(song, ev) {
  const f = ev.target.files && ev.target.files[0]
  ev.target.value = ''
  if (!f) return
  if (!f.type.startsWith('image/')) {
    setStatus('请选择图片文件', 'err')
    return
  }
  const fr = new FileReader()
  fr.onload = () => {
    song.art = fr.result
    song.artUrlRaw = ''
    loadArtImg(song, fr.result)
  }
  fr.readAsDataURL(f)
}

/* dataURL → Image 对象，加载完成触发重绘 */
function loadArtImg(song, dataUrl) {
  const img = new Image()
  img.onload = () => {
    song.artImg = img
    scheduleRender()
  }
  img.src = dataUrl
}

function autoGrow(e) {
  const el = e.target
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

/* ---------- 字体与图片预加载 ---------- */
let ready = false
const imgs = { bgs: {}, logos: {}, chuniTitleTextures: {}, logosMai: {}, bgsMai: {}, maiFestCards: {}, maiUnivCards: {}, maiBands: {} }

/* 1×1 透明占位：个别图挂了也让 drawImage 有东西可画，不炸整个渲染 */
const fallbackImg = (() => {
  const c = document.createElement('canvas')
  c.width = c.height = 1
  return c
})

function loadImage(src, bucket, key) {
  return new Promise((res) => {
    const done = (im) => {
      if (bucket) bucket[key] = im
      // 大批素材会分批抵达；不要等最慢的一张才刷新当前主题。
      // scheduleRender 内部带防抖，这里逐张触发不会造成连续重绘。
      if (ready) scheduleRender()
      res(im)
    }
    const img = new Image()
    img.onload = () => done(img)
    // 失败静默重试一次；再失败给透明占位——绝不让 Promise 挂起或 reject
    img.onerror = () => {
      const retry = new Image()
      retry.onload = () => done(retry)
      retry.onerror = () => done(fallbackImg)
      retry.src = src + (src.includes('?') ? '&' : '?') + 'retry=1'
    }
    img.src = src
  })
}

/* 素材按游戏分两批：中二（默认视图）先加载；舞萌素材等切过去再加载，
   避免首屏为了几十 MB 的舞萌图一直黑屏 */
function loadChuniAssets() {
  const jobs = []
  for (const [k, v] of Object.entries(CHUNI_VERSIONS)) {
    jobs.push(loadImage(v.bg, imgs.bgs, k))
    if (v.logo) jobs.push(loadImage(v.logo, imgs.logos, k))
    if (v.texture) jobs.push(loadImage(v.texture, imgs.chuniTitleTextures, k))
  }
  jobs.push(loadImage(CHUNI_ASSET_URLS.topBar, imgs, 'topBar'))
  jobs.push(loadImage(CHUNI_ASSET_URLS.bottomBar, imgs, 'bottomBar'))
  jobs.push(loadImage(CHUNI_ASSET_URLS.cardBg, imgs, 'cardBg'))
  jobs.push(loadImage(CHUNI_ASSET_URLS.cardBgUltima, imgs, 'cardBgUltima'))
  jobs.push(loadImage(CHUNI_ASSET_URLS.cardBgLegacy, imgs, 'cardBgLegacy'))
  jobs.push(loadImage(CHUNI_ASSET_URLS.cardBgUltimaLegacy, imgs, 'cardBgUltimaLegacy'))
  jobs.push(loadImage(CHUNI_ASSET_URLS.bandLegacy, imgs, 'bandLegacy'))
  jobs.push(loadImage(CHUNI_ASSET_URLS.logoSega, imgs, 'logoSega'))
  return jobs
}

function loadMaiAssets() {
  const jobs = []
  for (const [key, url] of Object.entries(maiLogoUrls)) {
    jobs.push(loadImage(url, imgs.logosMai, key))
  }
  MAI_UNIV_CARD_URLS.forEach((url, i) => jobs.push(loadImage(url, imgs.maiUnivCards, i)))
  for (const [key, url] of Object.entries(MAI_BAND_URLS)) {
    jobs.push(loadImage(url, imgs.maiBands, key))
  }
  imgs.maiEarly = {}
  for (const [key, url] of Object.entries(MAI_EARLY_URLS)) {
    jobs.push(loadImage(url, imgs.maiEarly, key))
  }
  imgs.maiEarlyBgs = {}
  for (const [key, url] of Object.entries(MAI_EARLY_BG_URLS)) {
    jobs.push(loadImage(url, imgs.maiEarlyBgs, key))
  }
  imgs.maiSplashCards = {}
  MAI_SPLASH_CARD_URLS.forEach((url, i) => jobs.push(loadImage(url, imgs.maiSplashCards, i)))
  imgs.maiPsd = { magical: {}, circleplus: {}, circle: {} }
  // festival～PRiSM PLUS 六版走 PSD 链路：bg / 用户自制 header 各自一库（卡片框徽章与 MAGiCAL 共用）
  for (const [key, url] of Object.entries(MAI_MODERN_BG_URLS)) {
    imgs.maiPsd[key] = imgs.maiPsd[key] || {}
    jobs.push(loadImage(url, imgs.maiPsd[key], 'bg'))
  }
  for (const [key, url] of Object.entries(MAI_MODERN_HEADER_URLS)) {
    imgs.maiPsd[key] = imgs.maiPsd[key] || {}
    jobs.push(loadImage(url, imgs.maiPsd[key], 'header'))
  }
  for (const [key, url] of Object.entries(MAI_MODERN_DECO_URLS)) {
    imgs.maiPsd[key] = imgs.maiPsd[key] || {}
    jobs.push(loadImage(url, imgs.maiPsd[key], 'deco'))
  }
  for (const [key, url] of Object.entries(MAI_MAGICAL_URLS)) {
    jobs.push(loadImage(url, imgs.maiPsd.magical, key))
  }
  for (const [key, url] of Object.entries(MAI_CIRCLEPLUS_URLS)) {
    jobs.push(loadImage(url, imgs.maiPsd.circleplus, key))
  }
  for (const [key, url] of Object.entries(MAI_CIRCLE_URLS)) {
    jobs.push(loadImage(url, imgs.maiPsd.circle, key))
  }
  imgs.maiMagical = imgs.maiPsd.magical
  imgs.maiCircleplus = imgs.maiPsd.circleplus
  imgs.maiCircle = imgs.maiPsd.circle
  imgs.maiMagicalCards = {}
  for (const [key, url] of Object.entries(MAI_MAGICAL_CARD_URLS)) {
    jobs.push(loadImage(url, imgs.maiMagicalCards, key))
  }
  jobs.push(loadImage(MAI_ASSET_URLS.sega, imgs, 'maiSega'))
  jobs.push(loadImage(MAI_ASSET_URLS.badge, imgs, 'maiBadge'))
  jobs.push(loadImage(MAI_CN_LOGO_URL, imgs, 'maiCnLogo'))
  jobs.push(loadImage(MAI_CN_DX_LOGO_URL, imgs, 'maiCnDxLogo'))
  jobs.push(loadImage(MAI_CN_2021_LOGO_URL, imgs, 'maiCn2021Logo'))
  jobs.push(loadImage(MAI_CN_2022_LOGO_URL, imgs, 'maiCn2022Logo'))
  jobs.push(loadImage(MAI_CN_2023_LOGO_URL, imgs, 'maiCn2023Logo'))
  jobs.push(loadImage(MAI_CN_2024_LOGO_URL, imgs, 'maiCn2024Logo'))
  jobs.push(loadImage(MAI_CN_2025_LOGO_URL, imgs, 'maiCn2025Logo'))
  jobs.push(loadImage(MAI_CN_2027_LOGO_URL, imgs, 'maiCn2027Logo'))
  return jobs
}

let maiAssetsStarted = false
const assetPromise = { chuni: Promise.resolve(), mai: Promise.resolve() }

function ensureMaiAssets() {
  if (maiAssetsStarted) return
  maiAssetsStarted = true
  assetPromise.mai = Promise.allSettled(loadMaiAssets())
  assetPromise.mai.then(() => scheduleRender())
}

async function preload() {
  const fontJobs = [
    new FontFace('NewRodin', `url(${newRodinUrl})`, { weight: '400 900' }).load().then((f) => document.fonts.add(f)),
    new FontFace('MiSans', `url(${miSansUrl})`, { weight: '400' }).load().then((f) => document.fonts.add(f)),
    new FontFace('FOT-UDKakugo_Large Pr6N', `url(${udKakugoEUrl})`, { weight: '700' }).load().then((f) => document.fonts.add(f)),
    new FontFace('FOT-UDKakugo_Large Pr6N', `url(${udKakugoHUrl})`, { weight: '900' }).load().then((f) => document.fonts.add(f)),
    new FontFace('FOT-NewRodin Pro', `url(${newRodinEbUrl})`, { weight: '900' }).load().then((f) => document.fonts.add(f)),
    new FontFace('FOT-NewRodin Pro', `url(${newRodinUrl})`, { weight: '700' }).load().then((f) => document.fonts.add(f)),
    new FontFace('UDShinGo SC', `url(${udShinGoScUrl})`, { weight: '900' }).load().then((f) => document.fonts.add(f)),
    new FontFace('UDShinGo SC', `url(${udShinGoScUrl})`, { weight: '700' }).load().then((f) => document.fonts.add(f))
  ]
  assetPromise.chuni = Promise.allSettled(loadChuniAssets())

  // 立刻先画一帧（此时素材/字体可能都没到，先出占位版式），随后字体与素材到位各自补帧。
  // 之前要等素材全部加载完才画，国内访问时会黑屏十几秒。
  ready = true
  render()
  await Promise.race([
    Promise.all(fontJobs).catch(() => null),
    new Promise((r) => setTimeout(r, 1500))
  ])
  render()
  Promise.allSettled(fontJobs).then(() => scheduleRender())
  assetPromise.chuni.then(() => scheduleRender())
}

/* ---------- 渲染调度 ---------- */
/* 用 setTimeout 而不是 rAF：部分内嵌 webview rAF 可能冻结，setTimeout 更稳 */
let renderTimer = null
function scheduleRender() {
  clearTimeout(renderTimer)
  renderTimer = setTimeout(() => render(), 30)
}

function collectText() {
  return [title.value, credit.value, ...songs.map((s) => `${s.name}\n${s.artist}`)].join('\n')
}

async function render() {
  if (!ready || !canvasRef.value) return
  // canvas 不会自动触发 unicode-range 子集字体（Noto Sans SC）的加载，
  // 渲染前必须对实际用到的文字调 document.fonts.load，否则中文回退会错字体
  const text = collectText()
  // 字体加载限时 1s：大字体（Noto 子集/UDShinGo 6.5MB）慢时先按已就绪的字画一帧，
  // 否则首屏会一直等着字体而黑屏；字体到位后 scheduleRender 会再补一帧
  try {
    await Promise.race([
      Promise.all([
        document.fonts.load("900 92px 'Noto Sans SC'", text),
        document.fonts.load("600 26px 'Noto Sans SC'", text),
        document.fonts.load("400 15px 'Noto Sans SC'", text),
        document.fonts.load("600 106px 'Noto Sans JP'", text),
        document.fonts.load("400 26px 'Noto Sans JP'", text),
        document.fonts.load("900 92px 'Noto Sans JP'", text),
        document.fonts.load("900 92px 'M PLUS Rounded 1c'", text),
        document.fonts.load("500 25px 'M PLUS Rounded 1c'", text),
        document.fonts.load("900 92px 'FOT-UDKakugo_Large Pr6N'", text),
        document.fonts.load("700 26px 'FOT-UDKakugo_Large Pr6N'", text),
        document.fonts.load("900 80px 'FOT-NewRodin Pro'", text),
        document.fonts.load("900 80px 'UDShinGo SC'", text)
      ]),
      new Promise((r) => setTimeout(r, 1000))
    ])
  } catch {
    /* 字体加载失败就用已加载的画 */
  }
  // willReadFrequently：强制软件渲染。部分嵌入式 webview 的 GPU 画布 readback
  // 会返回陈旧快照（toDataURL/getImageData 永远是首帧），软渲可绕开，真浏览器无副作用
  const { width, height } = canvasSize.value
  if (canvasRef.value.width !== width) canvasRef.value.width = width
  if (canvasRef.value.height !== height) canvasRef.value.height = height
  const ctx = canvasRef.value.getContext('2d', { willReadFrequently: true })
  try {
    if (game.value === 'chuni') {
      renderChuni(ctx, { version: version.value, title: title.value, songs: renderSongs.value, credit: credit.value }, imgs)
    } else {
      renderMai(ctx, { version: version.value, title: title.value, songs, credit: credit.value, useCnLogo: useCnLogo.value, showBadge: showBadge.value, dxLogoVariant: dxLogoVariant.value, festivalLogoVariant: festivalLogoVariant.value, universeLogoVariant: universeLogoVariant.value, splashAltBg: splashAltBg.value }, imgs)
    }
  } catch (e) {
    setStatus('渲染失败：' + (e.message || e), 'err')
  }
}

watch([version, title, credit, songs, useCnLogo, showBadge, dxLogoVariant, festivalLogoVariant, universeLogoVariant, splashAltBg], scheduleRender, { deep: true })

/* ---------- 导出 ---------- */
async function exportCanvas() {
  if (!ready) throw new Error('素材还在加载中')
  // 当前游戏的素材还在路上就等一会儿（上限 10s），保证导出与预览是同一套素材
  await Promise.race([assetPromise[game.value], new Promise((r) => setTimeout(r, 10000))])
  const off = document.createElement('canvas')
  off.width = canvasSize.value.width * 2
  off.height = canvasSize.value.height * 2
  const ctx = off.getContext('2d', { willReadFrequently: true })
  ctx.scale(2, 2)
  if (game.value === 'chuni') {
    renderChuni(ctx, { version: version.value, title: title.value, songs: renderSongs.value, credit: credit.value }, imgs)
  } else {
    renderMai(ctx, { version: version.value, title: title.value, songs, credit: credit.value, useCnLogo: useCnLogo.value, showBadge: showBadge.value, dxLogoVariant: dxLogoVariant.value, festivalLogoVariant: festivalLogoVariant.value, universeLogoVariant: universeLogoVariant.value, splashAltBg: splashAltBg.value }, imgs)
  }
  return off
}

async function downloadPng() {
  try {
    setStatus('正在生成图片…')
    const cv = await exportCanvas()
    const blob = await new Promise((res) => cv.toBlob(res, 'image/png'))
    if (!blob) throw new Error('toBlob 失败')
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `update_${game.value}_${version.value}_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.png`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setStatus('已下载 PNG', 'ok')
  } catch (e) {
    setStatus('导出失败：' + (e.message || e), 'err')
  }
}

async function copyPng() {
  try {
    setStatus('正在生成图片…')
    const cv = await exportCanvas()
    const blob = await new Promise((res) => cv.toBlob(res, 'image/png'))
    if (!navigator.clipboard || !window.ClipboardItem) throw new Error('浏览器不支持剪贴板图片')
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
    setStatus('已复制到剪贴板', 'ok')
  } catch (e) {
    setStatus('复制失败（' + (e.message || e) + '），请改用下载', 'err')
  }
}

/* ---------- 初始化 ---------- */
onMounted(async () => {
  addSong()
  addSong()
  songs[0].name = '示例曲名'
  songs[0].artist = '示例作曲家'
  songs[1].name = '另一首示例'
  songs[1].artist = 'Another Artist'
  await nextTick()
  await preload()
})

onBeforeUnmount(() => {
  clearTimeout(statusTimer)
  clearTimeout(renderTimer)
})
</script>

<style scoped>
.ug-page {
  height: 100vh;
  overflow: hidden;
  background: #12141d;
  color: #e8eaf6;
  font-family: 'Noto Sans SC', -apple-system, 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
}

/* ---- 顶部导航 ---- */
.ug-nav {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}
.ug-back {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: rgba(232, 234, 246, 0.65);
  text-decoration: none;
  transition: color 0.2s;
}
.ug-back:hover { color: #fff; }
.ug-brand {
  flex: 1;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.14em;
}
.ug-gh { color: rgba(232, 234, 246, 0.65); display: inline-flex; }
.ug-gh:hover { color: #fff; }

/* ---- 布局 ---- */
.ug-app {
  flex: 1;
  display: flex;
  min-height: 0;   /* flex 子项可收缩，编辑栏才能内部滚动而预览固定 */
}

/* ---- 编辑面板 ---- */
.ug-editor {
  width: 380px;
  flex-shrink: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.07);
  padding: 16px;
  overflow-y: auto;
  background: #161824;
}
.ug-group { margin-bottom: 18px; }
.ug-group-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.ug-label {
  display: block;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: rgba(232, 234, 246, 0.5);
  margin-bottom: 7px;
}

.ug-check {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #c8cdea;
  cursor: pointer;
}
.ug-check input { accent-color: #7c8cff; }
.ug-group-head .ug-label { margin-bottom: 0; }

.ug-tabs { display: flex; gap: 8px; }
.ug-tab {
  flex: 1;
  padding: 9px 0;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(232, 234, 246, 0.6);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s;
}
.ug-tab.on {
  background: linear-gradient(135deg, #7b5cff, #4ad9ff);
  border-color: transparent;
  color: #fff;
}
.ug-tab:disabled { opacity: 0.4; cursor: not-allowed; }

select,
textarea,
input[type='url'] {
  width: 100%;
  padding: 8px 10px;
  background: #232739;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #e8eaf6;
  font-size: 13px;
  font-family: inherit;
  box-sizing: border-box;
}
select option {
  background: #232739;
  color: #e8eaf6;
}
textarea { resize: vertical; min-height: 52px; }
select:focus, textarea:focus, input:focus { outline: none; border-color: #7b5cff; }

/* ---- 曲目编辑 ---- */
.ug-songs { display: flex; flex-direction: column; gap: 10px; }
.ug-song {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 9px;
}
.ug-song__head { display: flex; align-items: center; gap: 8px; margin-bottom: 7px; }
.ug-song__idx { font-size: 11px; letter-spacing: 0.1em; color: rgba(232, 234, 246, 0.45); }
.ug-song__ultima {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(232, 234, 246, 0.45);
  cursor: pointer;
  user-select: none;
}
.ug-song__ultima.on { color: #ffd84d; }
.ug-song__ultima input { accent-color: #ffd84d; margin: 0; }
.ug-song__del {
  margin-left: auto;
  background: transparent;
  border: none;
  color: #ff5d6c;
  font-size: 16px;
  cursor: pointer;
  padding: 2px 7px;
  border-radius: 4px;
}
.ug-song__del:hover { background: rgba(255, 93, 108, 0.12); }
.ug-song__art { display: flex; gap: 8px; margin-bottom: 7px; }
.ug-song__thumb {
  width: 46px;
  height: 46px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  object-fit: cover;
  flex-shrink: 0;
}
.ug-song__art-btns { flex: 1; display: flex; flex-direction: column; gap: 5px; }
.ug-song__art-btns input[type='url'] { font-size: 11.5px; padding: 5px 8px; }
.ug-song__colors {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 6px;
}
.ug-swatch {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 2px solid transparent;
  padding: 0;
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease;
}
.ug-swatch:hover { transform: scale(1.15); }
.ug-swatch.on { border-color: #fff; box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.25); }

.ug-song__text {
  min-height: 30px;
  padding: 6px 9px;
  font-size: 12px;
  resize: none;
  overflow: hidden;
  margin-bottom: 6px;
  line-height: 1.4;
}
.ug-song__text:last-child { margin-bottom: 0; }
.ug-empty { font-size: 12px; color: rgba(232, 234, 246, 0.4); text-align: center; padding: 14px 0; }

/* ---- 按钮 ---- */
.ug-btn {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #e8eaf6;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.18s;
}
.ug-btn:hover { background: rgba(255, 255, 255, 0.1); }
.ug-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.ug-btn--small { font-size: 11.5px; padding: 5px 9px; }
.ug-btn--primary {
  background: linear-gradient(135deg, #7b5cff, #4ad9ff);
  border: none;
  color: #fff;
  font-weight: 700;
}
.ug-btn--primary:hover { filter: brightness(1.12); }
.ug-actions { display: flex; gap: 10px; }
.ug-actions .ug-btn { flex: 1; }

.ug-status { min-height: 18px; font-size: 12px; color: #4ad9ff; }
.ug-status.err { color: #ff5d6c; }
.ug-status.ok { color: #4ade80; }

/* ---- 预览区 ---- */
.ug-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-width: 0;
  background:
    radial-gradient(800px 400px at 30% 20%, rgba(123, 92, 255, 0.08), transparent 70%),
    radial-gradient(800px 400px at 75% 80%, rgba(74, 217, 255, 0.06), transparent 70%);
}
.ug-frame {
  width: 100%;
  max-width: 1150px;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 16px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08);
  background: #000;
}
.ug-frame canvas { width: 100%; height: 100%; display: block; }
.ug-tip { margin-top: 12px; font-size: 12px; color: rgba(232, 234, 246, 0.4); }

/* ---- 窄屏：恢复普通页面滚动（上下堆叠布局） ---- */
@media (max-width: 900px) {
  .ug-page { height: auto; overflow: visible; }
  .ug-app { flex-direction: column; }
  .ug-editor { width: 100%; border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.07); overflow-y: visible; }
}
</style>
