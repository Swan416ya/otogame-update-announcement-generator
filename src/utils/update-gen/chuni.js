/**
 * CHUNITHM 乐曲追加公告图渲染器
 * 画布 1920×1080，所有素材同源，导出不会被跨域污染
 *
 * 两族模板：
 * - LEGACY（NEW / NEW PLUS / SUN / SUN PLUS）：藏青横幅 + 红色「新曲!!」绶带 + 纯黄标题
 *   + 方正卡片（纯平卡身、白框曲绘、名字-细线-署名）；底栏与版权行完全复用新版
 *   bottom-bar 样式（白条 + 黑版权字）
 *   排版参数自官方 news 图（new.png/sun.png）逐像素测量
 * - MODERN（LUMINOUS → MATE）：金渐变描边标题 + 553:746 卡片，LUMINOUS 起所有版本
 *   都要叠官方同款的顶部条/底部条（MATE 的背景只盖中间，其余版本盖满再叠条）
 */
import bgMate from '@/assets/update-gen/chuni/bg-mate.webp'
import bgLuminous from '@/assets/update-gen/chuni/bg-luminous.webp'
import bgLuminousPlus from '@/assets/update-gen/chuni/bg-luminous-plus.webp'
import bgVerse from '@/assets/update-gen/chuni/bg-verse.webp'
import bgXverse from '@/assets/update-gen/chuni/bg-xverse.webp'
import bgXversex from '@/assets/update-gen/chuni/bg-xversex.webp'
import bgNew from '@/assets/update-gen/chuni/bg-new.jpg'
import bgNewPlus from '@/assets/update-gen/chuni/bg-newplus.jpg'
import bgSun from '@/assets/update-gen/chuni/bg-sun.jpg'
import bgSunPlus from '@/assets/update-gen/chuni/bg-sunplus.jpg'
import bgCrystal from '@/assets/update-gen/chuni/bg-crystal-v2.png'
import bgCrystalPlus from '@/assets/update-gen/chuni/bg-crystalplus-v2.png'
import bgParadise from '@/assets/update-gen/chuni/bg-paradise-v1.png'
import bgParadiseLost from '@/assets/update-gen/chuni/bg-paradiselost-v1.png'
import textureCrystalTitle from '@/assets/update-gen/chuni/texture-crystal-title-v2.jpg'
import textureCrystalPlusTitle from '@/assets/update-gen/chuni/texture-crystalplus-title.jpg'
import logoMate from '@/assets/update-gen/chuni/logo-mate.png'
import logoLuminous from '@/assets/update-gen/chuni/logo-luminous.png'
import logoLuminousPlus from '@/assets/update-gen/chuni/logo-luminous-plus.png'
import logoVerse from '@/assets/update-gen/chuni/logo-verse.png'
import logoNew from '@/assets/update-gen/chuni/logo-new.webp'
import logoNewPlus from '@/assets/update-gen/chuni/logo-new-plus.webp'
import logoSun from '@/assets/update-gen/chuni/logo-sun.webp'
import logoSunPlus from '@/assets/update-gen/chuni/logo-sun-plus.webp'

/** 版本配置：style=legacy|modern；logoRect 无则不画 logo；bgSpecial='mate' 表示背景只盖中间、另叠顶/底条 */
export const CHUNI_VERSIONS = {
  crystal: {
    style: 'crystal', label: 'CHUNITHM CRYSTAL', bg: bgCrystal,
    logo: '/chart-theme/9-chunithm-crystal/logo.webp', texture: textureCrystalTitle
  },
  'crystal-plus': {
    style: 'crystal', label: 'CHUNITHM CRYSTAL PLUS', bg: bgCrystalPlus,
    logo: '/chart-theme/10-chunithm-crystalplus/logo.webp', texture: textureCrystalPlusTitle,
    crystalPlus: true
  },
  paradise: {
    style: 'paradise', label: 'CHUNITHM PARADISE', bg: bgParadise,
    logo: '/chart-theme/11-chunithm-paradise/logo.png'
  },
  'paradise-lost': {
    style: 'paradise', label: 'CHUNITHM PARADISE LOST', bg: bgParadiseLost,
    logo: '/chart-theme/12-chunithm-paradiselost/logo.webp', paradiseLost: true
  },
  new: { style: 'legacy', label: 'CHUNITHM NEW', bg: bgNew, logo: logoNew, logoRect: [1900, 40, 272, 120] },
  'new-plus': { style: 'legacy', label: 'CHUNITHM NEW PLUS', bg: bgNewPlus, logo: logoNewPlus, logoRect: [1909, 26, 306, 138] },
  sun: { style: 'legacy', label: 'CHUNITHM SUN', bg: bgSun, logo: logoSun, logoRect: [1900, 24, 209, 155] },
  'sun-plus': { style: 'legacy', label: 'CHUNITHM SUN PLUS', bg: bgSunPlus, logo: logoSunPlus, logoRect: [1900, 24, 209, 155] },
  luminous: { style: 'modern', label: 'CHUNITHM LUMINOUS', bg: bgLuminous, logo: logoLuminous, logoRect: [1609, 24, 289, 147] },
  'luminous-plus': { style: 'modern', label: 'CHUNITHM LUMINOUS PLUS', bg: bgLuminousPlus, logo: logoLuminousPlus, logoRect: [1618, 9, 266, 187] },
  verse: { style: 'modern', label: 'CHUNITHM VERSE', bg: bgVerse, logo: logoVerse, logoRect: [1631, 8, 255, 185] },
  xverse: { style: 'modern', label: 'CHUNITHM X-Verse', bg: bgXverse, logo: null },
  xversex: { style: 'modern', label: 'CHUNITHM X-Verse-X', bg: bgXversex, logo: null },
  mate: { style: 'modern', label: 'CHUNITHM MATE', bg: bgMate, logo: logoMate, logoRect: [1599, 33, 301, 131], bgSpecial: 'mate' }
}

/** 安全贴图：素材还没加载完（首帧会先出占位版式）时跳过，避免 drawImage(undefined) 直接抛错 */
function blit(ctx, img, ...args) {
  if (!img || !(img.width > 0)) return
  ctx.drawImage(img, ...args)
}

/** 素材加载中的占位帧（首帧不等素材时先画这个，避免黑屏也避免拿 undefined 量尺寸） */
function drawLoadingFrame(ctx) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
  ctx.fillStyle = '#e9ecf5'
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
  ctx.fillStyle = '#5b6076'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `500 30px 'NewRodin', 'UDShinGo SC', 'Noto Sans JP', 'Noto Sans SC', 'MiSans', sans-serif`
  ctx.fillText('素材加载中…', CANVAS_W / 2, CANVAS_H / 2)
}

const CANVAS_W = 1920
const CANVAS_H = 1080
const SONGS_AREA = { x: 80, y: 230, w: 1760, h: 760 }
const CARD_ASPECT = 553 / 746

/** MODERN 卡片内部排版（相对 553×746 卡片，来自 PSD 标注） */
const CARD = {
  art: { x: 0.116, y: 0.074, w: 0.772, h: 0.574 },
  name: { centerline: 0.779, size: 0.0633, sizeSingle: 0.0723, pad: 0.11, weight: 900, lineHeight: 1.3 },
  artist: { centerline: 0.906, size: 0.047, sizeSingle: 0.0542, pad: 0.15, weight: 600, maxLines: 2, lineHeight: 1.3 }
}

/** ULTiMA 卡：底图从官方 xversex 混排公告图抠出（ULTIMA 条与红线已 baked，经预加载后由 imgs 传入），
 *  曲绘孔和文字区位置与普通卡不同，文字为黑色 */
const CARD_ULTIMA = {
  art: { x: 0.1324, y: 0.0768, w: 0.7576, h: 0.5798 },
  name: { centerline: 0.795, size: 0.0633, sizeSingle: 0.0723, pad: 0.11, weight: 900, lineHeight: 1.3, color: '#1a1a1a' },
  artist: { centerline: 0.925, size: 0.047, sizeSingle: 0.0542, pad: 0.12, weight: 600, maxLines: 3, lineHeight: 1.35, color: '#2a2a2a' }
}

/** LEGACY 常量（自 new.png / newplus.png 测量；横幅整条与卡片底图均为官方图抠出/修补的资产，
 *  斜纹、绶带、蓝线、白框、分隔线全部 baked） */
const LEGACY = {
  titleColor: '#FFFF11',
  cardRatio: 0.917,
  // 单行卡片高：n=1..4（官方 3 首卡 541 高、4 首卡 428 高，1-2 首按 548 封顶）
  singleHeights: [548, 548, 541, 428],
  card: {
    art: { x: 0.1048, y: 0.0407, w: 0.7863, h: 0.7212 },
    name: { centerline: 0.826, size: 0.09, pad: 0.08, weight: 900, maxLines: 1, lineHeight: 1.25 },
    artist: { centerline: 0.941, size: 0.052, pad: 0.06, weight: 600, maxLines: 2, lineHeight: 1.3 }
  }
}

/** LEGACY 版 ULTIMA 卡：底图自官方 SUN「ULTIMA追加!」公告图抠出（ULTIMA 白字与红线 baked，
 *  已横向适配 LEGACY 卡框比例 0.917）；白带文字为黑色，署名两行时换用小字号（size2）防溢出白带 */
const CARD_ULTIMA_LEGACY = {
  art: { x: 0.1196, y: 0.0526, w: 0.7609, h: 0.6384 },
  name: { centerline: 0.848, size: 0.066, pad: 0.08, weight: 900, maxLines: 1, lineHeight: 1.25, color: '#1a1a1a' },
  artist: { centerline: 0.951, size: 0.047, size2: 0.042, pad: 0.06, weight: 600, maxLines: 2, lineHeight: 1.3, color: '#2a2a2a' }
}

/* ===================== MODERN 渲染 ===================== */

export function calcChuniLayout(n) {
  if (n <= 0) return null
  if (n <= 3) return { mode: 'single', cols: n, cardW: SONGS_AREA.h * CARD_ASPECT, cardH: SONGS_AREA.h, gap: 35 }
  if (n === 4) {
    const cardW = (SONGS_AREA.w - 3 * 24) / 4
    return { mode: 'single', cols: 4, cardW, cardH: cardW / CARD_ASPECT, gap: 24 }
  }
  const topCount = Math.ceil(n / 2)
  const cardH = (SONGS_AREA.h - 24) / 2
  const cardW = cardH * CARD_ASPECT
  return { mode: 'two-rows', cols: topCount, cardW, cardH, gap: 24, topCount, bottomCount: n - topCount }
}

function drawModernBase(ctx, ver, imgs) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
  if (ver.bgSpecial === 'mate') {
    blit(ctx, imgs.bgs.mate, 1, 165, 1919, 936)
    blit(ctx, imgs.topBar, 0, 0, 1920, 197)
    ctx.save()
    ctx.shadowColor = 'rgba(0,0,0,0.36)'
    ctx.shadowBlur = 21
    blit(ctx, imgs.bottomBar, 0, 1012, 1920, 68)
    ctx.restore()
  } else {
    const img = imgs.bgs[ver.key]
    const scale = Math.max(CANVAS_W / img.width, CANVAS_H / img.height)
    const dw = img.width * scale
    const dh = img.height * scale
    blit(ctx, img, (CANVAS_W - dw) / 2, (CANVAS_H - dh) / 2, dw, dh)
    // LUMINOUS 起的官方图都有顶部条（标题带底）与底部条（版权带底）
    blit(ctx, imgs.topBar, 0, 0, 1920, 197)
    ctx.save()
    ctx.shadowColor = 'rgba(0,0,0,0.36)'
    ctx.shadowBlur = 21
    blit(ctx, imgs.bottomBar, 0, 1012, 1920, 68)
    ctx.restore()
  }
  if (ver.logo && imgs.logos[ver.key]) {
    const [lx, ly, lw, lh] = ver.logoRect
    blit(ctx, imgs.logos[ver.key], lx, ly, lw, lh)
  }
}


function fitFontSize(ctx, text, maxWidth, baseSize, weight) {
  const lines = String(text || ' ').split('\n')
  const measure = (size) => {
    ctx.font = `${weight} ${size}px 'NewRodin', 'UDShinGo SC', 'Noto Sans JP', 'Noto Sans SC', 'MiSans', sans-serif`
    return Math.max(...lines.map((l) => ctx.measureText(l || ' ').width))
  }
  let size = baseSize
  const min = baseSize * 0.5
  while (measure(size) > maxWidth && size > min) size -= 1
  return size
}

function drawCenteredText(ctx, text, cx, centerlineY, size, cfg, maxLines) {
  let lines = String(text || ' ').split('\n')
  if (lines.length > maxLines) lines = lines.slice(0, maxLines)
  ctx.save()
  ctx.font = `${cfg.weight} ${size}px 'NewRodin', 'UDShinGo SC', 'Noto Sans JP', 'Noto Sans SC', 'MiSans', sans-serif`
  ctx.fillStyle = cfg.color || '#FFFFFF'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const lh = size * cfg.lineHeight
  const startY = centerlineY - ((lines.length - 1) * lh) / 2
  lines.forEach((l, i) => ctx.fillText(l, cx, startY + i * lh))
  ctx.restore()
}

function drawModernCard(ctx, song, x, y, w, h, cardBgImg, isSingle) {
  const cfg = song.ultima ? CARD_ULTIMA : CARD
  ctx.save()
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
  ctx.shadowOffsetX = 3
  ctx.shadowOffsetY = 3
  ctx.shadowBlur = 0
  blit(ctx, cardBgImg, x, y, w, h)
  ctx.restore()

  const ax = x + w * cfg.art.x
  const ay = y + h * cfg.art.y
  const aw = w * cfg.art.w
  const ah = h * cfg.art.h
  ctx.save()
  ctx.beginPath()
  ctx.rect(ax, ay, aw, ah)
  ctx.clip()
  if (song.artImg) {
    const img = song.artImg
    const scale = Math.max(aw / img.width, ah / img.height)
    const dw = img.width * scale
    const dh = img.height * scale
    blit(ctx, img, ax + (aw - dw) / 2, ay + (ah - dh) / 2, dw, dh)
  } else {
    ctx.fillStyle = '#808080'
    ctx.fillRect(ax, ay, aw, ah)
  }
  ctx.restore()

  const nameCfg = cfg.name
  const nameBase = (isSingle ? nameCfg.sizeSingle : nameCfg.size) * w
  const nameSize = fitFontSize(ctx, song.name, w * (1 - 2 * nameCfg.pad), nameBase, nameCfg.weight)
  drawCenteredText(ctx, song.name, x + w / 2, y + h * nameCfg.centerline, nameSize, nameCfg, Infinity)

  const artistCfg = cfg.artist
  const artistBase = (isSingle ? artistCfg.sizeSingle : artistCfg.size) * w
  const artistSize = fitFontSize(ctx, song.artist, w * (1 - 2 * artistCfg.pad), artistBase, artistCfg.weight)
  drawCenteredText(ctx, song.artist, x + w / 2, y + h * artistCfg.centerline, artistSize, artistCfg, artistCfg.maxLines)
}

function drawModernFooter(ctx, imgs, credit) {
  blit(ctx, imgs.logoSega, 15, 1022, 147, 49)
  const lines = String(credit || '').split('\n')
  ctx.save()
  ctx.font = "400 15px 'MiSans', 'Noto Sans SC', sans-serif"
  ctx.fillStyle = '#000000'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  const lh = 15 * 1.2
  lines.forEach((l, i) => ctx.fillText(l, 170, 1072 - (lines.length - 1 - i) * lh))
  ctx.restore()
}

function renderModern(ctx, state, imgs, ver) {
  drawModernBase(ctx, { ...ver, key: state.version }, imgs)
  drawChuniTitle(ctx, state.title)
  drawModernFooter(ctx, imgs, state.credit)

  const songs = state.songs
  const layout = calcChuniLayout(songs.length)
  if (!layout) return

  const isSingle = layout.mode === 'single' && layout.cols === 1
  const drawCards = (list, rowY) => {
    const rowW = list.length * layout.cardW + (list.length - 1) * layout.gap
    let x = SONGS_AREA.x + (SONGS_AREA.w - rowW) / 2
    list.forEach((s) => {
      drawModernCard(ctx, s, x, rowY, layout.cardW, layout.cardH, s.ultima ? imgs.cardBgUltima : imgs.cardBg, isSingle)
      x += layout.cardW + layout.gap
    })
  }

  if (layout.mode === 'single') {
    drawCards(songs, SONGS_AREA.y + (SONGS_AREA.h - layout.cardH) / 2)
  } else {
    const rowH = layout.cardH
    const topY = SONGS_AREA.y + (SONGS_AREA.h - 24) / 2 - rowH
    drawCards(songs.slice(0, layout.topCount), topY)
    drawCards(songs.slice(layout.topCount), topY + rowH + 24)
  }
}

/* ===================== CRYSTAL / CRYSTAL PLUS 旧框 ===================== */

const CRYSTAL_CARD = {
  ratio: 0.922,
  art: { x: 0.105, y: 0.043, w: 0.79, h: 0.724 },
  name: { centerline: 0.825, size: 0.068, pad: 0.065, weight: 700, maxLines: 2, lineHeight: 1.02, color: '#090909' },
  artist: { centerline: 0.935, size: 0.045, pad: 0.055, weight: 500, maxLines: 2, lineHeight: 1.1, color: '#111111' }
}

function crystalLayout(n, isPlus) {
  if (n <= 0) return null
  if (n === 1) return { mode: 'single', cardW: 445, cardH: 483, gap: 0, top: 358 }
  if (n === 2) return isPlus
    ? { mode: 'single', cardW: 500, cardH: 542, gap: 28, top: 333 }
    : { mode: 'single', cardW: 530, cardH: 575, gap: 28, top: 312 }
  if (n === 3) return { mode: 'single', cardW: 440, cardH: 477, gap: 22, top: 358 }
  if (n === 4) return { mode: 'single', cardW: 390, cardH: 423, gap: 24, top: 380 }
  const topCount = Math.ceil(n / 2)
  const cardW = Math.min(320, (1760 - (topCount - 1) * 24) / topCount)
  return { mode: 'two-rows', cardW, cardH: cardW / CRYSTAL_CARD.ratio, gap: 24, topCount }
}

function drawCrystalRibbon(ctx) {
  ctx.save()
  ctx.fillStyle = '#ff2019'
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(258, 0)
  ctx.lineTo(0, 258)
  ctx.closePath()
  ctx.fill()
  ctx.translate(78, 89)
  ctx.rotate(-Math.PI / 4)
  ctx.font = "900 61px 'UDShinGo SC', 'NewRodin', 'Noto Sans SC', sans-serif"
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#ffffff'
  ctx.fillText('新曲!!', 0, 0)
  ctx.restore()
}

function crystalTitleMetrics(ctx, text, fontSize, tracking) {
  ctx.font = `600 ${fontSize}px 'Noto Sans JP', 'NewRodin', 'FOT-NewRodin Pro', 'UDShinGo SC', sans-serif`
  const chars = [...text]
  const widths = chars.map((ch) => ctx.measureText(ch).width)
  return { chars, widths, width: widths.reduce((sum, width) => sum + width, 0) + Math.max(0, chars.length - 1) * tracking }
}

function drawCrystalTitle(ctx, title, texture, isPlus) {
  const text = String(title || '').replace(/\n+/g, ' ')
  const layer = document.createElement('canvas')
  layer.width = CANVAS_W
  layer.height = 190
  const lc = layer.getContext('2d')
  const fontSize = isPlus ? 104 : 111
  const tracking = isPlus ? 4 : 5
  const baseline = isPlus ? 139 : 143
  const maxWidth = 1420
  const metrics = crystalTitleMetrics(lc, text, fontSize, tracking)
  const scaleX = Math.min(1, maxWidth / Math.max(metrics.width, 1))
  const startX = (CANVAS_W - metrics.width * scaleX) / 2
  const family = "'Noto Sans JP', 'NewRodin', 'FOT-NewRodin Pro', 'UDShinGo SC', sans-serif"

  const paint = (mode, style, width = 0, offsetX = 0, offsetY = 0) => {
    lc.save()
    lc.translate(startX + offsetX, offsetY)
    lc.scale(scaleX, 1)
    lc.font = `600 ${fontSize}px ${family}`
    lc.textAlign = 'left'
    lc.textBaseline = 'alphabetic'
    lc.lineJoin = 'round'
    lc.miterLimit = 2
    if (mode === 'stroke') {
      lc.strokeStyle = style
      lc.lineWidth = width
    } else {
      lc.fillStyle = style
    }
    let x = 0
    metrics.chars.forEach((ch, i) => {
      if (mode === 'stroke') lc.strokeText(ch, x, baseline)
      else lc.fillText(ch, x, baseline)
      x += metrics.widths[i] + tracking
    })
    lc.restore()
  }

  // 原版阴影没有模糊扩散：同一轮廓以半透明暗色向左下直接错位。
  paint('stroke', isPlus ? 'rgba(39, 18, 42, .50)' : 'rgba(35, 18, 57, .48)', 18, -5, 8)
  paint('fill', isPlus ? 'rgba(39, 18, 42, .50)' : 'rgba(35, 18, 57, .48)', 0, -5, 8)

  // 主字只有四层：纯白外边 2 → 深色分隔 1 → 白黄白珠光 4 → 内暗线 1。
  // 最外侧的暗色来自上面的错位阴影，不再额外扩一圈描边。
  paint('stroke', '#ffffff', isPlus ? 14 : 16)

  const pattern = texture && texture.width > 1 ? lc.createPattern(texture, 'repeat') : (isPlus ? '#d71945' : '#ffd76b')
  // 生图纹理原幅较大；缩成细密纹理后，100px 高字面里才能呈现官方的小晶面与斜纹。
  if (pattern && typeof pattern !== 'string' && pattern.setTransform) {
    const textureScale = isPlus ? 0.36 : 0.47
    pattern.setTransform(new DOMMatrix([textureScale, 0, 0, textureScale, 0, isPlus ? 0 : 50]))
  }
  if (!isPlus) {
    paint('stroke', '#452060', 12)
    const gold = lc.createLinearGradient(0, 28, 0, 150)
    gold.addColorStop(0, '#fffdf2')
    gold.addColorStop(0.38, '#ffe977')
    gold.addColorStop(0.72, '#fff6b5')
    gold.addColorStop(1, '#ffffff')
    paint('stroke', gold, 10)
  } else {
    paint('stroke', '#641b35', 10)
    const plusGold = lc.createLinearGradient(0, 24, 0, 150)
    plusGold.addColorStop(0, '#fff8db')
    plusGold.addColorStop(0.32, '#c89669')
    plusGold.addColorStop(0.62, '#f4d4a1')
    plusGold.addColorStop(1, '#fff5dc')
    paint('stroke', plusGold, 7)
  }
  paint('stroke', isPlus ? '#43101f' : '#4b2673', isPlus ? 3 : 2)
  paint('fill', pattern)
  if (!isPlus) {
    // 原图字面仍以玫红/紫为主，蓝色只在最下沿露出；用半透明色层压住
    // 生图纹理的大晶面，保留细斜纹但避免变成高饱和“霓虹渐变字”。
    const faceTone = lc.createLinearGradient(0, 35, 0, 146)
    faceTone.addColorStop(0, 'rgba(247, 116, 148, .46)')
    faceTone.addColorStop(0.54, 'rgba(222, 62, 159, .42)')
    faceTone.addColorStop(0.82, 'rgba(126, 57, 170, .32)')
    faceTone.addColorStop(1, 'rgba(48, 130, 193, .18)')
    paint('fill', faceTone)
  }
  blit(ctx, layer, 0, 0)
}

function drawCrystalCard(ctx, song, x, y, w, h) {
  const C = CRYSTAL_CARD
  ctx.save()
  ctx.shadowColor = 'rgba(36, 25, 75, .28)'
  ctx.shadowBlur = 12
  ctx.shadowOffsetY = 6
  ctx.fillStyle = 'rgba(238, 249, 255, .88)'
  ctx.strokeStyle = 'rgba(255, 255, 255, .98)'
  ctx.lineWidth = Math.max(5, w * 0.015)
  ctx.fillRect(x, y, w, h)
  ctx.strokeRect(x, y, w, h)
  ctx.restore()

  // 旧框内部的浅蓝低多边形玻璃纹理。
  ctx.save()
  ctx.beginPath()
  ctx.rect(x, y, w, h)
  ctx.clip()
  const facets = [
    [0, .58, .48, 1, 'rgba(190,220,255,.18)'],
    [.46, 0, 1, .52, 'rgba(255,255,255,.20)'],
    [.12, .18, .72, .92, 'rgba(178,203,247,.12)'],
    [.64, .24, 1.08, .94, 'rgba(210,232,255,.24)']
  ]
  facets.forEach(([x1, y1, x2, y2, color]) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(x + w * x1, y + h * y1)
    ctx.lineTo(x + w * x2, y + h * y1)
    ctx.lineTo(x + w * ((x1 + x2) / 2), y + h * y2)
    ctx.closePath()
    ctx.fill()
  })
  ctx.restore()

  const ax = x + w * C.art.x
  const ay = y + h * C.art.y
  const aw = w * C.art.w
  const ah = h * C.art.h
  const matte = Math.max(8, w * 0.024)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(ax - matte, ay - matte, aw + matte * 2, ah + matte * 2)
  ctx.strokeStyle = 'rgba(180, 205, 220, .72)'
  ctx.lineWidth = Math.max(1.5, w * 0.004)
  ctx.strokeRect(ax - 1, ay - 1, aw + 2, ah + 2)
  ctx.save()
  ctx.beginPath()
  ctx.rect(ax, ay, aw, ah)
  ctx.clip()
  if (song.artImg) {
    const scale = Math.max(aw / song.artImg.width, ah / song.artImg.height)
    const dw = song.artImg.width * scale
    const dh = song.artImg.height * scale
    blit(ctx, song.artImg, ax + (aw - dw) / 2, ay + (ah - dh) / 2, dw, dh)
  } else {
    ctx.fillStyle = '#85888f'
    ctx.fillRect(ax, ay, aw, ah)
  }
  ctx.restore()

  const nameSize = fitFontSize(ctx, song.name, w * (1 - C.name.pad * 2), C.name.size * w, C.name.weight)
  drawCenteredText(ctx, song.name, x + w / 2, y + h * C.name.centerline, nameSize, C.name, C.name.maxLines)
  ctx.strokeStyle = '#6538a2'
  ctx.lineWidth = Math.max(1.5, w * 0.004)
  ctx.beginPath()
  ctx.moveTo(x + w * 0.05, y + h * 0.875)
  ctx.lineTo(x + w * 0.95, y + h * 0.875)
  ctx.stroke()
  const artistSize = fitFontSize(ctx, song.artist, w * (1 - C.artist.pad * 2), C.artist.size * w, C.artist.weight)
  drawCenteredText(ctx, song.artist, x + w / 2, y + h * C.artist.centerline, artistSize, C.artist, C.artist.maxLines)
}

function renderCrystal(ctx, state, imgs, ver) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
  blit(ctx, imgs.bgs[ver.key], 0, 0, CANVAS_W, CANVAS_H)
  drawCrystalRibbon(ctx)
  blit(ctx, imgs.logoSega, 1770, 14, 132, 48)
  drawCrystalTitle(ctx, state.title, imgs.chuniTitleTextures && imgs.chuniTitleTextures[ver.key], ver.crystalPlus)

  const songs = state.songs || []
  const layout = crystalLayout(songs.length, ver.crystalPlus)
  if (layout) {
    const drawRow = (list, rowY) => {
      const rowW = list.length * layout.cardW + (list.length - 1) * layout.gap
      let x = (CANVAS_W - rowW) / 2
      list.forEach((song) => {
        drawCrystalCard(ctx, song, x, rowY, layout.cardW, layout.cardH)
        x += layout.cardW + layout.gap
      })
    }
    if (layout.mode === 'single') drawRow(songs, layout.top)
    else {
      const rowGap = 22
      const totalH = layout.cardH * 2 + rowGap
      const top = 205 + (795 - totalH) / 2
      drawRow(songs.slice(0, layout.topCount), top)
      drawRow(songs.slice(layout.topCount), top + layout.cardH + rowGap)
    }
  }

  // 官方旧图底部为纯白版权带，版本 Logo 跨在背景与白带之间。
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 1021, CANVAS_W, 59)
  const versionLogo = imgs.logos && imgs.logos[ver.key]
  if (versionLogo) {
    const logoW = ver.crystalPlus ? 310 : 285
    const logoH = logoW * (versionLogo.height / versionLogo.width)
    blit(ctx, versionLogo, 8, ver.crystalPlus ? 849 : 865, logoW, logoH)
  }
  const lines = String(state.credit || '').split('\n')
  ctx.save()
  ctx.font = "400 13px 'MiSans', 'Noto Sans SC', sans-serif"
  ctx.fillStyle = '#161616'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'alphabetic'
  lines.forEach((line, i) => ctx.fillText(line, 1905, 1065 - (lines.length - 1 - i) * 15))
  ctx.restore()
}

/* ===================== PARADISE / PARADISE LOST 旧框 ===================== */

function paradiseTitleMetrics(ctx, text, fontSize, tracking) {
  ctx.font = `600 ${fontSize}px 'Noto Sans JP', 'NewRodin', 'FOT-NewRodin Pro', 'UDShinGo SC', sans-serif`
  const chars = [...text]
  const widths = chars.map((ch) => ctx.measureText(ch).width)
  return { chars, widths, width: widths.reduce((sum, width) => sum + width, 0) + Math.max(0, chars.length - 1) * tracking }
}

function drawParadiseTitle(ctx, title) {
  const text = String(title || '').replace(/\n+/g, ' ')
  const layer = document.createElement('canvas')
  layer.width = CANVAS_W
  layer.height = 190
  const lc = layer.getContext('2d')
  const fontSize = 106
  const tracking = 8
  const baseline = 142
  const maxWidth = 1260
  const metrics = paradiseTitleMetrics(lc, text, fontSize, tracking)
  const scaleX = Math.min(1, maxWidth / Math.max(metrics.width, 1))
  const startX = (CANVAS_W - metrics.width * scaleX) / 2
  const family = "'Noto Sans JP', 'NewRodin', 'FOT-NewRodin Pro', 'UDShinGo SC', sans-serif"

  lc.save()
  lc.translate(startX, 0)
  lc.scale(scaleX, 1)
  lc.font = `600 ${fontSize}px ${family}`
  lc.textAlign = 'left'
  lc.textBaseline = 'alphabetic'
  lc.lineJoin = 'round'
  lc.miterLimit = 2

  let x = 0
  metrics.chars.forEach((ch, i) => {
    const cw = Math.max(metrics.widths[i], 1)
    // 三份零模糊、零额外扩展、全不透明的完整描边字形，按原图逐级向右下错位。
    // 阴影必须连同主字的外轮廓一起复制；只复制 fill 会被后画的 16px 主描边完全盖住。
    lc.lineWidth = 16
    lc.fillStyle = '#00a878'
    lc.strokeStyle = '#00a878'
    lc.strokeText(ch, x + 9, baseline + 9)
    lc.fillText(ch, x + 9, baseline + 9)
    lc.fillStyle = '#ed184b'
    lc.strokeStyle = '#ed184b'
    lc.strokeText(ch, x + 6, baseline + 6)
    lc.fillText(ch, x + 6, baseline + 6)
    lc.fillStyle = '#17151c'
    lc.strokeStyle = '#17151c'
    lc.strokeText(ch, x + 3, baseline + 3)
    lc.fillText(ch, x + 3, baseline + 3)

    // 每个字分别建立字面和描边渐变，避免长标题共用一张连续渐变而产生色相漂移。
    const border = lc.createLinearGradient(x, 34, x + cw, 148)
    border.addColorStop(0, '#fff4b0')
    border.addColorStop(0.27, '#ffc545')
    border.addColorStop(0.54, '#fffbd4')
    border.addColorStop(0.78, '#ffd77d')
    border.addColorStop(1, '#f7ffff')
    lc.strokeStyle = '#24212c'
    lc.lineWidth = 16
    lc.strokeText(ch, x, baseline)
    lc.strokeStyle = border
    lc.lineWidth = 14
    lc.strokeText(ch, x, baseline)
    lc.strokeStyle = '#302737'
    lc.lineWidth = 4
    lc.strokeText(ch, x, baseline)

    // 原版是每个字各自重复一次、由右上向左下流动的五色字面：
    // 暖黄 → 橙 → 红 → 紫 → 蓝。黄色属于字面右上角的高光，并非纵向铺满。
    const face = lc.createLinearGradient(x + cw, 34, x, 148)
    face.addColorStop(0, '#fff06a')
    face.addColorStop(0.2, '#f7ad55')
    face.addColorStop(0.43, '#e55c68')
    face.addColorStop(0.7, '#a54f9e')
    face.addColorStop(1, '#31a6c5')
    lc.fillStyle = face
    lc.fillText(ch, x, baseline)
    x += metrics.widths[i] + tracking
  })
  lc.restore()
  blit(ctx, layer, 0, 0)
}

function paradiseLayout(n) {
  if (n <= 0) return null
  const ratio = 0.938
  if (n === 1) return { cardW: 580, cardH: 580 / ratio, gap: 28, top: 292, topCount: 1 }
  if (n === 2) return { cardW: 500, cardH: 500 / ratio, gap: 42, top: 330, topCount: 2 }
  if (n === 3) return { cardW: 430, cardH: 430 / ratio, gap: 30, top: 350, topCount: 3 }
  if (n === 4) return { cardW: 380, cardH: 380 / ratio, gap: 28, top: 370, topCount: 4 }
  const topCount = Math.ceil(n / 2)
  const cardW = Math.min(350, (1760 - (topCount - 1) * 24) / topCount)
  return { cardW, cardH: cardW / ratio, gap: 24, topCount, twoRows: true }
}

function drawParadiseCard(ctx, song, x, y, w, h, lost) {
  ctx.save()
  ctx.shadowColor = 'rgba(20, 24, 34, .16)'
  ctx.shadowBlur = 5
  ctx.shadowOffsetY = 5
  ctx.fillStyle = lost ? '#e8e9dc' : '#07578d'
  ctx.fillRect(x, y, w, h)
  ctx.restore()

  const pad = w * 0.105
  const artX = x + pad
  const artY = y + h * 0.032
  const artW = w - pad * 2
  const artH = artW
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(artX - w * 0.014, artY - w * 0.014, artW + w * 0.028, artH + w * 0.028)
  ctx.save()
  ctx.beginPath()
  ctx.rect(artX, artY, artW, artH)
  ctx.clip()
  if (song.artImg) {
    const scale = Math.max(artW / song.artImg.width, artH / song.artImg.height)
    const dw = song.artImg.width * scale
    const dh = song.artImg.height * scale
    blit(ctx, song.artImg, artX + (artW - dw) / 2, artY + (artH - dh) / 2, dw, dh)
  } else {
    ctx.fillStyle = '#85888f'
    ctx.fillRect(artX, artY, artW, artH)
  }
  ctx.restore()

  const color = lost ? '#075080' : '#ffffff'
  const nameCfg = { weight: 700, lineHeight: 1.02, color }
  const artistCfg = { weight: 500, lineHeight: 1.05, color }
  const nameSize = fitFontSize(ctx, song.name, w * 0.88, w * 0.064, 700)
  drawCenteredText(ctx, song.name, x + w / 2, y + h * 0.825, nameSize, nameCfg, 2)
  ctx.strokeStyle = color
  ctx.lineWidth = Math.max(2, w * 0.004)
  ctx.beginPath()
  ctx.moveTo(x + w * 0.045, y + h * 0.875)
  ctx.lineTo(x + w * 0.955, y + h * 0.875)
  ctx.stroke()
  const artistSize = fitFontSize(ctx, song.artist, w * 0.88, w * 0.052, 500)
  drawCenteredText(ctx, song.artist, x + w / 2, y + h * 0.945, artistSize, artistCfg, 2)
}

function renderParadise(ctx, state, imgs, ver) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
  blit(ctx, imgs.bgs[ver.key], 0, 0, CANVAS_W, CANVAS_H)
  drawCrystalRibbon(ctx)
  blit(ctx, imgs.logoSega, 1770, 14, 132, 48)
  drawParadiseTitle(ctx, state.title)

  const songs = state.songs || []
  const layout = paradiseLayout(songs.length)
  if (layout) {
    const drawRow = (list, rowY) => {
      const rowW = list.length * layout.cardW + (list.length - 1) * layout.gap
      let x = (CANVAS_W - rowW) / 2
      list.forEach((song) => {
        drawParadiseCard(ctx, song, x, rowY, layout.cardW, layout.cardH, ver.paradiseLost)
        x += layout.cardW + layout.gap
      })
    }
    if (!layout.twoRows) drawRow(songs, layout.top)
    else {
      const rowGap = 20
      const totalH = layout.cardH * 2 + rowGap
      const top = 195 + (817 - totalH) / 2
      drawRow(songs.slice(0, layout.topCount), top)
      drawRow(songs.slice(layout.topCount), top + layout.cardH + rowGap)
    }
  }

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 1012, CANVAS_W, 68)
  const versionLogo = imgs.logos && imgs.logos[ver.key]
  if (versionLogo) {
    const logoW = ver.paradiseLost ? 302 : 300
    const logoH = logoW * (versionLogo.height / versionLogo.width)
    blit(ctx, versionLogo, 16, ver.paradiseLost ? 888 : 900, logoW, logoH)
  }
  const lines = String(state.credit || '').split('\n')
  ctx.save()
  ctx.font = "400 13px 'MiSans', 'Noto Sans SC', sans-serif"
  ctx.fillStyle = '#161616'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'alphabetic'
  lines.forEach((line, i) => ctx.fillText(line, 1905, 1065 - (lines.length - 1 - i) * 15))
  ctx.restore()
}

/* ===================== LEGACY 渲染 ===================== */

export function calcLegacyLayout(n) {
  if (n <= 0) return null
  const R = LEGACY.cardRatio
  if (n <= 4) {
    const cardH = LEGACY.singleHeights[n - 1]
    const cardW = cardH * R
    return { mode: 'single', cols: n, cardW, cardH, gap: n === 4 ? 38 : 44 }
  }
  const topCount = Math.ceil(n / 2)
  const cardW = Math.min(345, (1760 - (topCount - 1) * 30) / topCount)
  const cardH = cardW / R
  return { mode: 'two-rows', cols: topCount, cardW, cardH, gap: 30, topCount, bottomCount: n - topCount }
}

/** 标题渲染（LEGACY/MODERN 完全共用，官方实测：字号 114、基线 157、纯黄 #FFFF11、
 *  数字字号比 1.17、藏青外圈 7 + 白 keyline 1.6 + 投影） */
function drawChuniTitle(ctx, title) {
  const lines = String(title || '').split('\n').filter((l, i, arr) => l.trim() !== '' || arr.length === 1)
  if (!lines.length) lines.push('')
  const fontSize = 114
  const digitRatio = 1.17
  const lineHeight = fontSize * 1.15
  const startY = 157 - ((lines.length - 1) * lineHeight) / 2
  const fontOf = (size) => `900 ${size}px 'NewRodin', 'UDShinGo SC', 'Noto Sans JP', 'Noto Sans SC', 'MiSans', sans-serif`

  const layer = document.createElement('canvas')
  layer.width = CANVAS_W
  layer.height = CANVAS_H
  const lc = layer.getContext('2d')
  lc.textBaseline = 'alphabetic'
  lc.lineJoin = 'round'
  lc.miterLimit = 2
  lc.lineWidth = 11
  lc.fillStyle = '#FFFF11'

  lines.forEach((line, i) => {
    let x = 0
    const chars = []
    for (const ch of line) {
      const size = /[0-9]/.test(ch) ? fontSize * digitRatio : fontSize
      lc.font = fontOf(size)
      const w = lc.measureText(ch).width
      chars.push({ ch, x, size })
      x += w + 2
    }
    const bx = (CANVAS_W - Math.max(x - 2, 0)) / 2
    const by = startY + i * lineHeight
    // 藏青外圈 → 白 keyline → 黄填充
    chars.forEach(({ ch, x: cx, size }) => {
      lc.font = fontOf(size)
      lc.strokeStyle = '#1A2E36'
      lc.lineWidth = 7
      lc.strokeText(ch, bx + cx, by)
    })
    chars.forEach(({ ch, x: cx, size }) => {
      lc.font = fontOf(size)
      lc.strokeStyle = '#ffffff'
      lc.lineWidth = 1.6
      lc.strokeText(ch, bx + cx, by)
    })
    chars.forEach(({ ch, x: cx, size }) => {
      lc.font = fontOf(size)
      lc.fillText(ch, bx + cx, by)
    })
  })

  ctx.save()
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)'
  ctx.shadowBlur = 12
  blit(ctx, layer, 0, 0)
  ctx.restore()
}

/** LEGACY 顶部：官方横幅整条资产（斜纹+绶带+蓝线 baked，标题/logo 已抠除）+ 版本 logo + 标题 */
function drawLegacyHeader(ctx, state, imgs, ver) {
  // 官方横幅整条
  blit(ctx, imgs.bandLegacy, 0, 0, 1920, 196)

  // 版本 logo（横幅右侧，logoRect = [右缘x, 顶y, 宽, 高]）
  if (ver.logo && imgs.logos[ver.key]) {
    const [rx, ly, lw, lh] = ver.logoRect
    blit(ctx, imgs.logos[ver.key], rx - lw, ly, lw, lh)
  }

  drawChuniTitle(ctx, state.title)
}

function drawLegacyCard(ctx, song, x, y, w, h, cardBgImg) {
  const C = song.ultima ? CARD_ULTIMA_LEGACY : LEGACY.card
  // 官方抠出的卡模板（白框 + 分隔线 baked）+ 软阴影
  ctx.save()
  ctx.shadowColor = 'rgba(0, 0, 0, 0.35)'
  ctx.shadowOffsetX = 4
  ctx.shadowOffsetY = 5
  ctx.shadowBlur = 16
  blit(ctx, cardBgImg, x, y, w, h)
  ctx.restore()

  // 曲绘（cover 裁切进曲绘孔）
  const ax = x + w * C.art.x
  const ay = y + h * C.art.y
  const aw = w * C.art.w
  const ah = h * C.art.h
  ctx.save()
  ctx.beginPath()
  ctx.rect(ax, ay, aw, ah)
  ctx.clip()
  if (song.artImg) {
    const img = song.artImg
    const scale = Math.max(aw / img.width, ah / img.height)
    const dw = img.width * scale
    const dh = img.height * scale
    blit(ctx, img, ax + (aw - dw) / 2, ay + (ah - dh) / 2, dw, dh)
  } else {
    ctx.fillStyle = '#808080'
    ctx.fillRect(ax, ay, aw, ah)
  }
  ctx.restore()

  // 名字
  const nameCfg = C.name
  const nameSize = fitFontSize(ctx, song.name, w * (1 - 2 * nameCfg.pad), nameCfg.size * w, nameCfg.weight)
  drawCenteredText(ctx, song.name, x + w / 2, y + h * nameCfg.centerline, nameSize, nameCfg, nameCfg.maxLines)

  // 署名（最多 2 行，分隔线已 baked；LEGACY ULTIMA 白带浅，两行时换小字号）
  const artistCfg = C.artist
  const artistLines = Math.min(String(song.artist || ' ').split('\n').length, artistCfg.maxLines)
  const artistBase = (artistLines > 1 && artistCfg.size2 ? artistCfg.size2 : artistCfg.size) * w
  const artistSize = fitFontSize(ctx, song.artist, w * (1 - 2 * artistCfg.pad), artistBase, artistCfg.weight)
  drawCenteredText(ctx, song.artist, x + w / 2, y + h * artistCfg.centerline, artistSize, artistCfg, artistCfg.maxLines)
}

function renderLegacy(ctx, state, imgs, ver) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
  // 背景 cover-fit（资产已修掉底部条，无字无 logo）
  const img = imgs.bgs[ver.key]
  const scale = Math.max(CANVAS_W / img.width, CANVAS_H / img.height)
  const dw = img.width * scale
  const dh = img.height * scale
  blit(ctx, img, (CANVAS_W - dw) / 2, (CANVAS_H - dh) / 2, dw, dh)

  drawLegacyHeader(ctx, state, imgs, ver)

  // 底栏 + 版权行：完全复用新版（MODERN）的底部栏样式（bottom-bar 白条 + 黑版权字）
  ctx.save()
  ctx.shadowColor = 'rgba(0, 0, 0, 0.36)'
  ctx.shadowBlur = 21
  blit(ctx, imgs.bottomBar, 0, 1012, 1920, 68)
  ctx.restore()
  drawModernFooter(ctx, imgs, state.credit)

  const songs = state.songs
  const layout = calcLegacyLayout(songs.length)
  if (!layout) return

  const gridTop = 208
  const gridH = 790
  const drawRow = (list, rowY) => {
    const rowW = list.length * layout.cardW + (list.length - 1) * layout.gap
    let x = (CANVAS_W - rowW) / 2
    list.forEach((s) => {
      drawLegacyCard(ctx, s, x, rowY, layout.cardW, layout.cardH, s.ultima ? imgs.cardBgUltimaLegacy : imgs.cardBgLegacy)
      x += layout.cardW + layout.gap
    })
  }

  if (layout.mode === 'single') {
    drawRow(songs, gridTop + (gridH - layout.cardH) / 2)
  } else {
    const rowBlock = layout.cardH
    const topY = gridTop + (gridH - rowBlock * 2 - 30) / 2
    drawRow(songs.slice(0, layout.topCount), topY)
    drawRow(songs.slice(layout.topCount), topY + rowBlock + 30)
  }
}

/**
 * 主渲染入口
 * @param ctx 1920×1080 画布上下文
 * @param state { version, title, songs, credit }  songs: [{name, artist, artImg, ultima}]
 * @param imgs 预加载好的图片对象 { bgs, logos, topBar, bottomBar, cardBg, cardBgUltima, cardBgLegacy, cardBgUltimaLegacy, logoSega }
 */
export function renderChuni(ctx, state, imgs) {
  const ver = CHUNI_VERSIONS[state.version] || CHUNI_VERSIONS.mate
  const withKey = { ...ver, key: state.version }
  // 背景没到就出占位帧：首帧不等素材，但不能拿着 undefined 去量尺寸/贴图
  if (!imgs.bgs || !imgs.bgs[withKey.key]) {
    drawLoadingFrame(ctx)
    return
  }
  if (ver.style === 'crystal') renderCrystal(ctx, state, imgs, withKey)
  else if (ver.style === 'paradise') renderParadise(ctx, state, imgs, withKey)
  else if (ver.style === 'legacy') renderLegacy(ctx, state, imgs, withKey)
  else renderModern(ctx, state, imgs, withKey)
}
