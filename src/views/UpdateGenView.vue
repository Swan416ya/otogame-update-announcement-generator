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
      <a
        class="ug-gh"
        href="https://github.com/Swan416ya/otogame-update-announcement-generator"
        target="_blank"
        rel="noopener noreferrer"
        title="前往生成器仓库点 Star"
        aria-label="前往生成器 GitHub 仓库"
      >
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
            <!-- 悬停就先把舞萌渲染器的代码 chunk 取回来（只取代码，不碰素材图） -->
            <button type="button" class="ug-tab" :class="{ on: game === 'mai' }" @pointerenter="loadMaiModule" @pointerdown="loadMaiModule" @click="game = 'mai'">舞萌DX</button>
          </div>
        </section>

        <!-- 版本 -->
        <section class="ug-group">
          <label class="ug-label" for="ug-version">版本</label>
          <select id="ug-version" v-model="version">
            <option v-for="(v, k) in versionList" :key="k" :value="k">{{ shortVersionLabel(v.label) }}</option>
          </select>
        </section>

        <section v-if="supportsGlobalUltima" class="ug-group">
          <label class="ug-check ug-check--ultima">
            <input v-model="globalUltima" type="checkbox" />
            全局 ULTIMA 模式
          </label>
          <p class="ug-hint">启用后切换为 ULTIMA 专用标题与红黑背景，现有及新增曲目都会固定使用 ULTIMA 卡片。</p>
        </section>

        <section v-if="chuniCnLogoLabel" class="ug-group">
          <label class="ug-check">
            <input v-model="useCnLogo" type="checkbox" />
            使用国服 Logo（{{ chuniCnLogoLabel }}）
          </label>
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
                  <input v-model="s.ultima" type="checkbox" :disabled="globalUltima" /> ULTiMA
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
          <button type="button" class="ug-btn ug-btn--primary" :disabled="maiModuleLoading" @click="downloadPng">下载 PNG</button>
          <button type="button" class="ug-btn" :disabled="maiModuleLoading" @click="copyPng">复制图片</button>
        </section>

        <p class="ug-status" :class="statusType">{{ status }}</p>
      </aside>

      <!-- ============ 右侧预览 ============ -->
      <main class="ug-preview">
        <div class="ug-frame" :style="{ aspectRatio: `${canvasSize.width} / ${canvasSize.height}` }">
          <canvas ref="canvasRef" :width="canvasSize.width" :height="canvasSize.height"></canvas>
          <!-- 当前主题的素材还没到位时盖一层提示；已有上一帧就保留画面，不闪灰 -->
          <div v-if="themeLoading || maiModuleLoading" class="ug-loading">
            <span class="ug-loading__spinner"></span>
            <span>{{ loadingText }}</span>
          </div>
        </div>
        <p class="ug-tip">预览为 {{ canvasSize.width }}×{{ canvasSize.height }} 等比缩放，导出按 2× 高清渲染。曲绘只在本机浏览器读取转换，不会上传到任何服务器。</p>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick, shallowRef } from 'vue'
import { CHUNI_VERSIONS, renderChuni, chuniThemeAssets, supportsChuniGlobalUltima } from '@/utils/update-gen/chuni'
import { ensureFonts, getAssetStore } from '@/utils/update-gen/themeAssets'
// Noto Sans SC / M PLUS 已由 main.js 全局引入；这里只补本页用到而全局没有的 Noto Sans JP 600/900
import '@fontsource/noto-sans-jp/600.css'
import '@fontsource/noto-sans-jp/900.css'
import '@fontsource/noto-sans-jp/400.css'

/* ---------- 主题素材库 ----------
   store 是页面级单例：打开页面只加载当前主题需要的图；切主题才补新主题缺的，
   已经加载过的图不清、永久留在内存里，切回来立即出图。 */
const store = getAssetStore()
const imgs = store.imgs

/* ---------- 舞萌渲染器按需加载 ----------
   中二是默认视图，不点「舞萌DX」就不下载舞萌渲染器（以及它带的素材 URL）。 */
const maiModule = shallowRef(null)
const maiModuleLoading = ref(false)
let maiModulePromise = null
function loadMaiModule() {
  if (!maiModulePromise) {
    maiModuleLoading.value = true
    maiModulePromise = import('@/utils/update-gen/mai')
      .then((mod) => {
        maiModule.value = mod
        return mod
      })
      .finally(() => {
        maiModuleLoading.value = false
      })
  }
  return maiModulePromise
}

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
const globalUltima = ref(false)
const status = ref('')
const statusType = ref('')
const canvasRef = ref(null)
const fileInputs = ref([])
const themeLoading = ref(false)
const themeProgress = ref({ done: 0, total: 0 })
const canvasSize = computed(() => game.value === 'chuni' && (version.value === 'amazon' || version.value === 'amazon-plus')
  ? { width: 1440, height: 1080 }
  : { width: 1920, height: 1080 })
/** 预览区角上的加载提示文案（舞萌渲染器是独立 chunk，加载它时素材清单还是空的） */
const loadingText = computed(() => {
  if (maiModuleLoading.value) return '正在加载舞萌渲染器…'
  const { done, total } = themeProgress.value
  return total ? `正在加载素材 ${done}/${total}…` : '正在加载素材…'
})
let songSeq = 0

function shortVersionLabel(label) {
  return String(label || '')
    .replace(/^CHUNITHM\s+/i, '')
    .replace(/^maimai\s*でらっくす\s*/i, '')
}

const isDev = import.meta.env.DEV || (typeof location !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(location.hostname))
/* 线上放行的舞萌主题（DX 初代/PLUS、PRiSM/PRiSM PLUS 与 PSD 校准过的 MAGiCAL 三版） */
const MAI_LAUNCH_KEYS = ['deradx', 'splash', 'splashplus', 'universe', 'festival', 'buddies', 'buddiesplus', 'prism', 'prismplus', 'circle', 'circleplus', 'magical']
const CHUNI_VERSION_KEYS = Object.keys(CHUNI_VERSIONS)

/** 当前可选的舞萌版本（渲染器按需加载，没加载完之前为空） */
function maiVersionKeys() {
  const mod = maiModule.value
  if (!mod) return []
  const keys = isDev ? Object.keys(mod.MAI_VERSIONS).filter((k) => k !== 'festivalplus' && k !== 'universeplus') : MAI_LAUNCH_KEYS
  return keys.filter((k) => mod.MAI_VERSIONS[k])
}

const versionList = computed(() => {
  if (game.value === 'chuni') return CHUNI_VERSIONS
  const mod = maiModule.value
  if (!mod) return {}
  const out = {}
  for (const k of maiVersionKeys()) out[k] = mod.MAI_VERSIONS[k]
  return out
})
const supportsGlobalUltima = computed(() => game.value === 'chuni' && supportsChuniGlobalUltima(version.value))
const chuniCnLogoLabel = computed(() => game.value === 'chuni' ? (CHUNI_VERSIONS[version.value]?.cnLabel || '') : '')
/** 影响舞萌素材清单的 UI 开关（切开关时会补对应的 logo） */
const maiUi = computed(() => ({
  useCnLogo: useCnLogo.value,
  dxLogoVariant: dxLogoVariant.value,
  festivalLogoVariant: festivalLogoVariant.value,
  universeLogoVariant: universeLogoVariant.value,
  splashAltBg: splashAltBg.value
}))
/** 当前主题需要哪些素材（由渲染器自己声明，见 chuni.js / mai.js） */
const themeAssets = computed(() => {
  if (game.value === 'chuni') return chuniThemeAssets(version.value, { globalUltima: globalUltima.value, useCnLogo: useCnLogo.value })
  const mod = maiModule.value
  return mod ? mod.maiThemeAssets(version.value, maiUi.value) : null
})
const maiPalette = computed(() => {
  const mod = maiModule.value
  if (!mod) return []
  return mod.MAI_PALETTES[mod.MAI_VERSIONS[version.value]?.family || 'festival'] || []
})
const OLD_CHUNI_VERSIONS = new Set(['amazon', 'amazon-plus', 'crystal', 'crystal-plus', 'paradise', 'paradise-lost'])
const songLimit = computed(() => game.value === 'chuni' && OLD_CHUNI_VERSIONS.has(version.value) ? 9 : 10)
const renderSongs = computed(() => songs.slice(0, songLimit.value).map((song) => globalUltima.value ? { ...song, ultima: true } : song))

/**
 * 当前主题要用到的字体集合。
 * - 中二：标题/卡片用 NewRodin + UDShinGo，版权行用 MiSans；旧版（crystal/paradise）标题的兜底才需要 FOT-NewRodin Pro。
 * - 舞萌：卡片与标题用 FOT-NewRodin Pro + UDShinGo；UDKakugo（11.5MB）只在 DX 初代做缺字兜底。
 */
function fontsForTheme() {
  if (game.value === 'chuni') {
    const base = ['newRodinB', 'udShinGo', 'miSans']
    return OLD_CHUNI_VERSIONS.has(version.value) ? [...base, 'newRodinEB'] : base
  }
  return version.value === 'deradx' ? ['newRodinEB', 'udShinGo', 'kakugo'] : ['newRodinEB', 'udShinGo']
}

/* 切游戏时把版本切到该游戏的最新版本（列表末项，与中二 mate 默认一致） */
watch(game, async (g) => {
  if (g === 'mai') {
    await loadMaiModule()
    if (game.value !== 'mai') return
    const keys = maiVersionKeys()
    version.value = keys[keys.length - 1] || 'magical'
  } else {
    version.value = CHUNI_VERSION_KEYS[CHUNI_VERSION_KEYS.length - 1]
  }
  ensureCurrentTheme()
})

watch(supportsGlobalUltima, (supported) => {
  if (!supported) globalUltima.value = false
})
watch(chuniCnLogoLabel, (label) => {
  if (game.value === 'chuni' && !label) useCnLogo.value = false
})
watch(globalUltima, (enabled) => {
  if (enabled) songs.forEach((song) => { song.ultima = true })
})

function addSong() {
  if (songs.length >= songLimit.value) return
  songs.push({ id: ++songSeq, name: '', artist: '', art: '', artUrlRaw: '', ultima: globalUltima.value, frameIndex: null })
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

/* ---------- 主题素材加载 ---------- */
let ready = false
/** 上一次真正画出来的 'game:version'：切到还没加载的主题时保留上一帧，不闪黑/闪灰 */
let paintedTheme = ''

/**
 * 确保当前主题的素材已就位。
 * 先只等主背景（最快出图），再把该主题其余素材与字体并行补齐；
 * 素材库按 URL 全局去重，所以重复调用只是补缺，已加载的立即返回。
 */
let themeSeq = 0
async function ensureCurrentTheme() {
  const seq = ++themeSeq
  if (game.value === 'mai' && !maiModule.value) return
  const info = themeAssets.value
  if (!info) return
  syncThemeLoadState(info)
  await store.ensure(info.entries.filter((e) => e.url === info.primary))
  if (seq !== themeSeq) return
  syncThemeLoadState(info)
  scheduleRender()
  const fontsJob = ensureFonts(fontsForTheme())
  await store.ensure(info.entries)
  if (seq !== themeSeq) return
  syncThemeLoadState(info)
  scheduleRender()
  fontsJob.then(() => {
    if (seq === themeSeq) scheduleRender()
  })
}

/** 同步「正在加载主题素材 x/y」提示 */
function syncThemeLoadState(info) {
  themeLoading.value = info ? !store.isReady(info.primary) : false
  themeProgress.value = info ? store.progress(info.entries) : { done: 0, total: 0 }
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

/** 按当前游戏/版本画到指定画布；预览与导出共用同一段逻辑，保证两边素材一致 */
function paintTo(ctx) {
  if (game.value === 'chuni') {
    renderChuni(ctx, { version: version.value, title: title.value, songs: renderSongs.value, credit: credit.value, globalUltima: globalUltima.value, useCnLogo: useCnLogo.value }, imgs)
    return true
  }
  const mod = maiModule.value
  if (!mod) return false
  mod.renderMai(ctx, { version: version.value, title: title.value, songs, credit: credit.value, useCnLogo: useCnLogo.value, showBadge: showBadge.value, dxLogoVariant: dxLogoVariant.value, festivalLogoVariant: festivalLogoVariant.value, universeLogoVariant: universeLogoVariant.value, splashAltBg: splashAltBg.value }, imgs)
  return true
}

async function render() {
  if (!ready || !canvasRef.value) return
  if (game.value === 'mai' && !maiModule.value) return
  const info = themeAssets.value
  // 当前主题主背景还没到：首帧让渲染器画「素材加载中」占位；
  // 已经画过别的主题时保留上一帧，等背景到位再重绘，避免灰屏闪烁。
  if (info && !store.isReady(info.primary) && paintedTheme) return
  // canvas 不会自动触发 unicode-range 子集字体（Noto Sans SC）的加载，
  // 渲染前必须对实际用到的文字调 document.fonts.load，否则中文回退会错字体
  const text = collectText()
  // 字体加载限时 1s：大字体慢时先按已就绪的字画一帧，字体到位后 scheduleRender 会再补一帧
  try {
    await Promise.race([
      Promise.all([
        document.fonts.load("900 92px 'Noto Sans SC'", text),
        document.fonts.load("600 26px 'Noto Sans SC'", text),
        document.fonts.load("400 15px 'Noto Sans SC'", text),
        document.fonts.load("600 106px 'Noto Sans JP'", text),
        document.fonts.load("400 26px 'Noto Sans JP'", text),
        document.fonts.load("900 92px 'Noto Sans JP'", text),
        document.fonts.load("900 92px 'NewRodin'", text),
        document.fonts.load("700 26px 'NewRodin'", text),
        document.fonts.load("900 80px 'FOT-NewRodin Pro'", text),
        document.fonts.load("700 26px 'FOT-NewRodin Pro'", text),
        document.fonts.load("900 80px 'UDShinGo SC'", text),
        document.fonts.load("700 26px 'UDShinGo SC'", text),
        document.fonts.load("400 15px 'MiSans'", text),
        document.fonts.load("900 80px 'FOT-UDKakugo_Large Pr6N'", text)
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
  // 字体等待最长 1s，期间可能已经切到别的游戏/主题：重绘前再确认一次，
  // 避免把「素材加载中」占位盖到已经画好的画面上。
  if (game.value === 'mai' && !maiModule.value) return
  const latest = themeAssets.value
  if (latest && !store.isReady(latest.primary) && paintedTheme) return
  try {
    paintTo(ctx)
    paintedTheme = `${game.value}:${version.value}:${globalUltima.value}`
  } catch (e) {
    setStatus('渲染失败：' + (e.message || e), 'err')
  }
}

/* 版本/开关变化：先补该主题素材（切换主题才下载新图）；内容变化只触发重绘 */
watch([version, globalUltima, useCnLogo, dxLogoVariant, festivalLogoVariant, universeLogoVariant, splashAltBg], () => ensureCurrentTheme())
watch([version, title, credit, songs, globalUltima, useCnLogo, showBadge, dxLogoVariant, festivalLogoVariant, universeLogoVariant, splashAltBg], scheduleRender, { deep: true })

/* ---------- 导出 ---------- */
async function exportCanvas() {
  if (!ready) throw new Error('素材还在加载中')
  if (game.value === 'mai' && !maiModule.value) throw new Error('舞萌渲染器还没加载好')
  const info = themeAssets.value
  // 当前主题素材还在路上就等一会儿（上限 10s），保证导出与预览是同一套素材
  await Promise.race([
    Promise.all([store.ensure(info ? info.entries : []), ensureFonts(fontsForTheme())]),
    new Promise((r) => setTimeout(r, 10000))
  ])
  const off = document.createElement('canvas')
  off.width = canvasSize.value.width * 2
  off.height = canvasSize.value.height * 2
  const ctx = off.getContext('2d', { willReadFrequently: true })
  ctx.scale(2, 2)
  paintTo(ctx)
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
let unsubscribeAssets = null
onMounted(async () => {
  addSong()
  addSong()
  songs[0].name = '示例曲名'
  songs[0].artist = '示例作曲家'
  songs[1].name = '另一首示例'
  songs[1].artist = 'Another Artist'
  // 任意一张图到位就补一帧（素材库内部按 URL 去重，切主题也不会重复下载）
  unsubscribeAssets = store.subscribe(() => {
    syncThemeLoadState(themeAssets.value)
    scheduleRender()
  })
  await nextTick()
  ready = true
  // 先出一帧占位版式，然后只加载当前主题的素材与字体，边到边补帧
  scheduleRender()
  ensureCurrentTheme()
})

onBeforeUnmount(() => {
  clearTimeout(statusTimer)
  clearTimeout(renderTimer)
  if (unsubscribeAssets) unsubscribeAssets()
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
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
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
  justify-self: start;
}
.ug-back:hover { color: #fff; }
.ug-brand {
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.14em;
}
.ug-gh {
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 9px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(232, 234, 246, 0.72);
  font-size: 12px;
  text-decoration: none;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}
.ug-gh strong { color: #ffd65a; font-variant-numeric: tabular-nums; }
.ug-gh:hover {
  color: #fff;
  border-color: rgba(255, 214, 90, 0.55);
  background: rgba(255, 214, 90, 0.08);
}

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
.ug-check--ultima {
  color: #ff6a8f;
  font-weight: 700;
}
.ug-check--ultima input { accent-color: #ff315f; }
.ug-hint {
  margin: 7px 0 0 24px;
  color: rgba(232, 234, 246, 0.48);
  font-size: 11px;
  line-height: 1.55;
}
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
  position: relative;
  width: 100%;
  max-width: 1150px;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 16px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08);
  background: #000;
}
.ug-frame canvas { width: 100%; height: 100%; display: block; }

/* ---- 主题素材加载提示 ---- */
.ug-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(232, 234, 246, 0.85);
  background: rgba(12, 14, 22, 0.38);
  backdrop-filter: blur(1.5px);
  pointer-events: none;
}
.ug-loading__spinner {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(232, 234, 246, 0.25);
  border-top-color: #4ad9ff;
  animation: ug-spin 0.8s linear infinite;
}
@keyframes ug-spin {
  to { transform: rotate(360deg); }
}
.ug-tip { margin-top: 12px; font-size: 12px; color: rgba(232, 234, 246, 0.4); }

/* ---- 窄屏：恢复普通页面滚动（上下堆叠布局） ---- */
@media (max-width: 900px) {
  .ug-page { height: auto; overflow: visible; }
  .ug-app { flex-direction: column; }
  .ug-editor { width: 100%; border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.07); overflow-y: visible; }
}
</style>
