/**
 * maimai DX 乐曲追加公告图渲染器
 * —— 全部几何常数在官方 news 图（2048×1152）上逐像素实测后 ×0.9375 换算到 1920×1080 ——
 *
 * 布局家族：
 *  - festival 系：紫色锯齿横幅 + 白→黄渐变标题(紫描边/白keyline) + 流派色卡片（白边+彩框+藏青双色带）
 *  - universe 系：粉底白格横幅 + 珊瑚→黄标题(藏青描边/白keyline/粉投影) + 彩框卡片（浮空藏青带+像素方块装饰）
 * 卡片模板/横幅/SEGA/徽章均为官方图抠取；标题为程序化（字号/基线/描边宽度实测）。
 */
import logoDx from '@/assets/update-gen/mai/logo-deradx.png'
import logoDxplus from '@/assets/update-gen/mai/logo-plus.png'
import logoSplash from '@/assets/update-gen/mai/logo-splash.png'
import logoSplashplus from '@/assets/update-gen/mai/logo-splashplus.png'
import logoUniverse from '@/assets/update-gen/mai/logo-universe.png'
import logoUniverseplus from '@/assets/update-gen/mai/logo-universeplus.png'
import logoFestival from '@/assets/update-gen/mai/logo-festival.png'
import logoFestivalplus from '@/assets/update-gen/mai/logo-festivalplus.png'
import logoBuddies from '@/assets/update-gen/mai/logo-buddies-clean.png'
import logoBuddiesplus from '@/assets/update-gen/mai/logo-buddiesplus-clean.png'
import logoPrism from '@/assets/update-gen/mai/logo-prism.png'
import logoPrismplus from '@/assets/update-gen/mai/logo-prismplus.png'
import logoCircle from '@/assets/update-gen/mai/logo-circle.png'
import logoCircleplus from '@/assets/update-gen/mai/logo-circleplus.png'
import logoMagical from '@/assets/update-gen/mai/logo-magical.png'
/* 国服 logo（舞萌DX 2026）：仅 PRiSM PLUS 主题下可切换 */
import logoMaiCn from '@/assets/update-gen/mai/logo-mai-cn.png'
import logoMaiCnDx from '@/assets/update-gen/mai/logo-mai-cn-dx.png'
import logoMaiCn2021 from '@/assets/update-gen/mai/logo-mai-cn-2021.png'
import logoMaiCn2022 from '@/assets/update-gen/mai/logo-mai-cn-2022.png'
import logoMaiCn2023 from '@/assets/update-gen/mai/logo-mai-cn-2023.png'
import logoMaiCn2024 from '@/assets/update-gen/mai/logo-mai-cn-2024.png'
import logoMaiCn2025 from '@/assets/update-gen/mai/logo-mai-cn-2025-v3.png'
import logoMaiCn2027 from '@/assets/update-gen/mai/logo-mai-cn-2027.png'
import bandFestivalUrl from '@/assets/update-gen/mai/band-festival.png'
import bandBuddiesUrl from '@/assets/update-gen/mai/band-buddies.png'
import bandPrismUrl from '@/assets/update-gen/mai/band-prism.png'
import bandCircleUrl from '@/assets/update-gen/mai/band-circle.png'
import segaUrl from '@/assets/update-gen/chuni/logo-sega.svg'
import badgeUrl from '@/assets/update-gen/mai/badge.png'
import cardEarlyGreenUrl from '@/assets/update-gen/mai/card-early-green.png'
import cardDxGreenUrl from '@/assets/update-gen/mai/card-dx-green-v2.png'
import cardSplashBodyOrangeUrl from '@/assets/update-gen/mai/card-splash-body-orange-v4.png'
import cardSplashBodyTealUrl from '@/assets/update-gen/mai/card-splash-body-teal-v5.png'
import cardSplashBodyBlueUrl from '@/assets/update-gen/mai/card-splash-body-blue-v5.png'
import cardSplashBodyPurpleUrl from '@/assets/update-gen/mai/card-splash-body-purple-v4.png'
import cardSplashBodyGreenUrl from '@/assets/update-gen/mai/card-splash-body-green-v4.png'
import cardSplashBodyRedUrl from '@/assets/update-gen/mai/card-splash-body-red-v4.png'
import badgeEarlyUrl from '@/assets/update-gen/mai/badge-early.png'
import bgDxUrl from '@/assets/update-gen/mai/bg-dx-v2.png'
import bgSplashUrl from '@/assets/update-gen/mai/bg-splash-v2.png'
import bgSplashStripeUrl from '@/assets/update-gen/mai/bg-splash-stripe-v2.png'
import bgSplashplusUrl from '@/assets/update-gen/mai/bg-splashplus-v2.png'
import bgFestivalUrl from '@/assets/update-gen/mai/bg-festival-v2.png'
import bgFestivalplusUrl from '@/assets/update-gen/mai/bg-festivalplus.png'
import bgBuddiesUrl from '@/assets/update-gen/mai/bg-buddies-v2.png'
import bgBuddiesplusUrl from '@/assets/update-gen/mai/bg-buddiesplus-v2.png'
import bgUniverseUrl from '@/assets/update-gen/mai/bg-universe-v2.png'
import bgPrismUrl from '@/assets/update-gen/mai/bg-prism.png'
import bgPrismplusUrl from '@/assets/update-gen/mai/bg-prismplus.png'
import bgCircleUrl from '@/assets/update-gen/mai/bg-circle.png'
import bgMagicalUrl from '@/assets/update-gen/mai/bg-magical.png'
import headerMagicalUrl from '@/assets/update-gen/mai/header-magical.png'
import bgCircleplusUrl from '@/assets/update-gen/mai/bg-circleplus.png'
import headerCircleplusUrl from '@/assets/update-gen/mai/header-circleplus.png'
import headerCircleUrl from '@/assets/update-gen/mai/header-circle.png'
import headerCircleCnUrl from '@/assets/update-gen/mai/header-circle-cn.png'
import cardMagicalGreenUrl from '@/assets/update-gen/mai/card-magical-green.png'
import cardMagicalTealUrl from '@/assets/update-gen/mai/card-magical-teal.png'
import cardMagicalOrangeUrl from '@/assets/update-gen/mai/card-magical-orange.png'
import cardMagicalPurpleUrl from '@/assets/update-gen/mai/card-magical-purple.png'
import cardMagicalBlueUrl from '@/assets/update-gen/mai/card-magical-blue.png'
import cardMagicalRedUrl from '@/assets/update-gen/mai/card-magical-red.png'
import badgeMagicalUrl from '@/assets/update-gen/mai/badge-magical.png'

/* 卡片模板 glob（视图侧同样 glob 这两个目录做预加载） */
const univCardModules = import.meta.glob('@/assets/update-gen/mai/cards-univ/card-*.png', { eager: true, import: 'default' })
const sortUrls = (m) => Object.entries(m).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })).map(([, u]) => u)
export const MAI_UNIV_CARD_URLS = sortUrls(univCardModules)
export const MAI_BAND_URLS = { festival: bandFestivalUrl, buddies: bandBuddiesUrl, prism: bandPrismUrl, circle: bandCircleUrl }
export const MAI_ASSET_URLS = { sega: segaUrl, badge: badgeUrl }
export const MAI_CN_LOGO_URL = logoMaiCn
export const MAI_CN_DX_LOGO_URL = logoMaiCnDx
export const MAI_CN_2021_LOGO_URL = logoMaiCn2021
export const MAI_CN_2022_LOGO_URL = logoMaiCn2022
export const MAI_CN_2023_LOGO_URL = logoMaiCn2023
export const MAI_CN_2024_LOGO_URL = logoMaiCn2024
export const MAI_CN_2025_LOGO_URL = logoMaiCn2025
export const MAI_CN_2027_LOGO_URL = logoMaiCn2027
export const MAI_EARLY_URLS = {
  cardGreen: cardEarlyGreenUrl,
  cardDxGreen: cardDxGreenUrl,
  badge: badgeEarlyUrl
}
export const MAI_SPLASH_CARD_URLS = [cardSplashBodyOrangeUrl, cardSplashBodyTealUrl, cardSplashBodyBlueUrl, cardSplashBodyPurpleUrl, cardSplashBodyGreenUrl, cardSplashBodyRedUrl]
export const MAI_EARLY_BG_URLS = { dx: bgDxUrl, splash: bgSplashUrl, splashAlt: bgSplashStripeUrl, splashplus: bgSplashplusUrl }
export const MAI_MODERN_BG_URLS = { universe: bgUniverseUrl, festival: bgFestivalUrl, festivalplus: bgFestivalplusUrl, buddies: bgBuddiesUrl, buddiesplus: bgBuddiesplusUrl, prism: bgPrismUrl, prismplus: bgPrismplusUrl }
/** 用户自制 header 素材（可含出框效果、底部纯色分界线）：放 header-{ver}.png 进 assets 即自动接入；缺省走旧横幅+logo 过渡态 */
const MODERN_VERSIONS = ['festival', 'festivalplus', 'buddies', 'buddiesplus', 'prism', 'prismplus']
const modernHeaderModules = import.meta.glob('@/assets/update-gen/mai/header-*.png', { eager: true, import: 'default' })
export const MAI_MODERN_HEADER_URLS = Object.fromEntries(
  Object.entries(modernHeaderModules)
    .map(([path, url]) => [path.split('/').pop().replace(/^header-|\.png$/g, ''), url])
    .filter(([key]) => MODERN_VERSIONS.includes(key))
)
/** 横幅下沿垂下来的装饰云（必须压在卡片之上）：放 deco-{ver}.png 进 assets 即自动接入 */
const modernDecoModules = import.meta.glob('@/assets/update-gen/mai/deco-*.png', { eager: true, import: 'default' })
export const MAI_MODERN_DECO_URLS = Object.fromEntries(
  Object.entries(modernDecoModules)
    .map(([path, url]) => [path.split('/').pop().replace(/^deco-|\.png$/g, ''), url])
    .filter(([key]) => MODERN_VERSIONS.includes(key))
)
export const MAI_MAGICAL_URLS = { bg: bgMagicalUrl, header: headerMagicalUrl, badge: badgeMagicalUrl }
export const MAI_CIRCLEPLUS_URLS = { bg: bgCircleplusUrl, header: headerCircleplusUrl, badge: badgeMagicalUrl }
// CiRCLE 用 PSD 版 bg（已覆盖 bg-circle.png）+ 自己的 header
export const MAI_CIRCLE_URLS = { bg: bgCircleUrl, header: headerCircleUrl, headerCn: headerCircleCnUrl, badge: badgeMagicalUrl }
export const MAI_MAGICAL_CARD_URLS = {
  cardGreen: cardMagicalGreenUrl,
  cardTeal: cardMagicalTealUrl,
  cardOrange: cardMagicalOrangeUrl,
  cardPurple: cardMagicalPurpleUrl,
  cardBlue: cardMagicalBlueUrl,
  cardRed: cardMagicalRedUrl
}
export const MAI_MAGICAL_CARD_KEYS = ['cardGreen', 'cardTeal', 'cardOrange', 'cardPurple', 'cardBlue', 'cardRed']

/** 卡片模板对应的流派框色（festival.png 实测）；UI 色板按家族给模板索引 */
export const MAI_CARD_COLORS = ['#f5761e', '#f5761e', '#f5761e', '#12b8c8', '#12b8c8', '#12b8c8', '#12b8c8', '#12b8c8', '#a64ce0', '#5ad67e']
/** MAGiCAL 卡片框 hue 旋转角（基准=绿框 136°；橙/青/蓝/紫/粉/薄荷） */
export const MAGICAL_HUES = [0, -106, 49, 77, 136, -164, 29]

export const MAI_PALETTES = {
  festival: [],   // 占位：六版卡片池已切到 MAGiCAL 六色框，实际色板见下方覆盖
  universe: [
    { color: '#f5761e', idx: 0 },
    { color: '#12c8d8', idx: 5 },
    { color: '#a64ce0', idx: 8 },
    { color: '#5ad67e', idx: 9 }
  ],
  earlySplash: [
    { color: '#f6a245', idx: 0 },
    { color: '#22c8c2', idx: 1 },
    { color: '#42a6ed', idx: 2 },
    { color: '#b66fe4', idx: 3 },
    { color: '#61d983', idx: 4 },
    { color: '#f16e79', idx: 5 }
  ],
  earlyDx: [
    { color: '#5ed67a', idx: 0 },
    { color: '#2dd4b0', idx: 1 },
    { color: '#f59a1e', idx: 2 },
    { color: '#c07ef5', idx: 3 },
    { color: '#3d9af0', idx: 4 },
    { color: '#f56a6a', idx: 5 }
  ],
  magical: [
    { color: '#5ed67a', idx: 0 },   // 绿框
    { color: '#2dd4b0', idx: 1 },   // 蓝绿框
    { color: '#f59a1e', idx: 2 },   // 橙框
    { color: '#c07ef5', idx: 3 },   // 紫框
    { color: '#3d9af0', idx: 4 },   // 蓝框
    { color: '#f56a6a', idx: 5 }    // 红框
  ]
}
// CiRCLE / CiRCLE PLUS 与 MAGiCAL 六色框像素级一致（用户 PSD 实测），色板共用
MAI_PALETTES.circleplus = MAI_PALETTES.magical
// festival～PRiSM PLUS 六版卡片框 = MAGiCAL 六色（像素级共用），色板一致
MAI_PALETTES.festival = MAI_PALETTES.magical
MAI_PALETTES.circle = MAI_PALETTES.magical
MAI_PALETTES.universe = MAI_PALETTES.magical
MAI_PALETTES.splash = MAI_PALETTES.earlySplash
MAI_PALETTES.splashplus = MAI_PALETTES.earlySplash
/** 早期卡（绿面板模板）各流派色的 hue 旋转角（相对面板绿 ~145°） */
const EARLY_HUE = [30 - 145, 185 - 145, 215 - 145, 275 - 145, 145 - 145, 160 - 145]

/** 安全贴图：素材还没加载完（首帧会先出占位版式）时跳过，避免 drawImage(undefined) 直接抛错 */
function blit(ctx, img, ...args) {
  if (!img || !(img.width > 0)) return
  ctx.drawImage(img, ...args)
}

const logoOutlineMasks = new WeakMap()

/** 按透明像素轮廓绘制实色外描边，不给素材本身加模糊或发光。 */
function blitOutlined(ctx, img, x, y, w, h, color = '#ffffff', outline = 4) {
  if (!img || !(img.width > 0)) return
  let cached = logoOutlineMasks.get(img)
  if (!cached || cached.color !== color) {
    const mask = document.createElement('canvas')
    mask.width = img.naturalWidth || img.width
    mask.height = img.naturalHeight || img.height
    const mc = mask.getContext('2d')
    mc.drawImage(img, 0, 0)
    mc.globalCompositeOperation = 'source-in'
    mc.fillStyle = color
    mc.fillRect(0, 0, mask.width, mask.height)
    cached = { color, mask }
    logoOutlineMasks.set(img, cached)
  }
  // 多方向叠画剪影，形成均匀而清晰的实边。
  for (let i = 0; i < 20; i++) {
    const angle = i * Math.PI * 2 / 20
    ctx.drawImage(cached.mask, x + Math.cos(angle) * outline, y + Math.sin(angle) * outline, w, h)
  }
  ctx.drawImage(img, x, y, w, h)
}
/** 等比贴图：素材按自身比例缩放到矩形内并居中，目标框比例与素材不符时也不会拉伸变形 */
function blitFit(ctx, img, x, y, w, h) {
  if (!img || !(img.width > 0) || !w || !h) return
  const s = Math.min(w / img.width, h / img.height)
  const dw = img.width * s
  const dh = img.height * s
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh)
}

/** 素材加载中的占位帧（首帧不等素材时先画这个，避免黑屏也避免拿 undefined 量尺寸） */
function drawLoadingFrame(ctx) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
  ctx.fillStyle = '#e9ecf5'
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
  ctx.fillStyle = '#5b6076'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `500 30px ${FONT}`
  ctx.fillText('素材加载中…', CANVAS_W / 2, CANVAS_H / 2)
}

const CANVAS_W = 1920
const CANVAS_H = 1080
const FONT = `'FOT-NewRodin Pro', 'UDShinGo SC', 'Noto Sans JP', 'Noto Sans SC', sans-serif`
const DX2022_TITLE_STYLE = {
  // 2022 / Splash PLUS 的字面也是明显的低矮宽体，不能用窄高字形硬压进标题区。
  em: 92,
  scaleX: 0.98,
  scaleY: 1.06,
  fill: [[0, '#fff86c'], [0.52, '#ffef2b'], [1, '#ffda08']],
  strokes: [
    { color: 'rgba(116, 239, 207, 0.82)', w: 33 },
    { color: '#ffffff', w: 25 },
    { color: '#2438c4', w: 15 }
  ],
  shadow: { color: 'rgba(45, 68, 128, 0.22)', blur: 3, dy: 3 }
}
const DX_CLASSIC_TITLE_STYLE = {
  // 参考图是低矮宽体：字身很矮，但整句横向占据标题区约三分之二宽度。
  em: 86,
  scaleX: 1,
  scaleY: 1.06,
  family: `'UDShinGo SC', 'FOT-UDKakugo_Large Pr6N', 'Noto Sans SC', sans-serif`,
  fill: [[0, '#ffffff'], [0.42, '#f7ffff'], [1, '#91daf4']],
  strokes: [
    // Canvas 描边由外向内绘制；成品由内向外为天蓝、深蓝、白色三层。
    { color: '#ffffff', w: 20 },
    { color: '#176fba', w: 14 },
    { color: '#74c9ee', w: 6 }
  ],
  // 官方字是软塑料立体层：背层只向下错位，因此下沿明显厚于上沿。
  extrusion: {
    dy: 4,
    strokes: [
      { color: 'rgba(185, 225, 239, 0.92)', w: 21 },
      { color: '#286f9c', w: 14 }
    ],
    fill: '#79bad4'
  },
  shadow: { color: 'rgba(44, 83, 103, 0.18)', blur: 1, dx: 1, dy: 1 }
}

/* ================= 家族配置（常数已换算到 1920×1080） ================= */

const FAMILIES = {
  universe: {
    bandH: 161,
    bandImg: false,
    logo: { x: 15, y: 8, h: 135 },
    sega: { x: 1734, y: 9, w: 169, h: 70 },
    title: {
      em: 104, baseline: 119, scaleX: 0.94, maxW: 1375,
      fill: [[0, '#ff9ab5'], [0.48, '#ffc36b'], [1, '#ffe339']],
      strokes: [
        { color: '#f392b4', w: 30 },
        { color: '#fffdf8', w: 21 },
        { color: '#2e318d', w: 11 }
      ],
      // 官方标题只有多层描边，没有投影。
      shadow: { color: 'transparent', blur: 0, dx: 0, dy: 0 }
    },
    card: {
      ratio: 1.315,
      art: { x: 0.049, y: 0.036, w: 0.902, h: 0.686 },
      name: { cy: 0.806, size: 0.059, color: '#ffe329', weight: 900 },
      artist: { cy: 0.925, size: 0.045, color: '#ffffff', weight: 700 },
      shadow: { color: 'rgba(0,0,0,0.48)', blur: 14, dy: 7 }
    },
    grid: { cardW: 300, top1: 185, rowPitch: 405, pitch: 335 },
    single: {
      1: { w: 610, top: 250, gap: 0 },
      2: { w: 575, top: 255, gap: 90 },
      3: { w: 520, top: 300, gap: 45 },
      4: { w: 425, top: 325, gap: 35 },
      5: { w: 310, top: 330, gap: 38 }
    }
  },
  earlySplash: {
    // 早期（Splash/Splash PLUS）：Qwen 洗净的官方背景（波浪头条/底浪已烘焙进背景）+ 白框彩面板卡 + 右上柠檬圆徽章
    logo: null,
    sega: { x: 1747, y: 1024, w: 123, h: 42 },   // 右下（素材比例 2.93，不拉伸）
    credit: { x: 24, y: 1043, align: 'left' },
    title: {
      em: 110, baseline: 130, scaleX: 0.62, maxW: 1250,
      fill: [[0, '#fff36b'], [1, '#ffd700']],
      stroke: '#2440c8', strokeW: 8,
      keyline: '#ffffff', keylineW: 18,
      shadow: { color: 'rgba(20, 40, 140, 0.35)', blur: 4, dy: 4 }
    },
    card: {
      ratio: 720 / 520,
      art: { x: 0.042, y: 0.053, w: 0.923, h: 0.681 },
      name: { cy: 0.813, size: 0.056, color: '#fff01e', weight: 900 },
      artist: { cy: 0.903, size: 0.039, color: '#ffffff', weight: 700 },
      shadow: { color: 'rgba(0,0,0,0.30)', blur: 10, dy: 4 }
    },
    grid: { cardW: 272, top1: 246, rowPitch: 403, pitch: 331 },
    single: {
      1: { w: 487.5, top: 255, gap: 0 },
      2: { w: 487.5, top: 255, gap: 93.75 },
      3: { w: 487.5, top: 255, gap: 93.75 },
      4: { w: 420, top: 300, gap: 40 },
      5: { w: 272, top: 300, gap: 59 }
    },
    badge: { x: 1491, y: 19, w: 417 }  // 柠檬圆徽章（首行字动态）
  },
  splash: {
    // Splash 独立版式：单行卡自带 NEW!，双行改用无 NEW! 的紧凑框。
    logo: { right: 18, y: 10, h: 132 },
    sega: { x: 14, y: 994, w: 205, h: 72 },
    credit: { x: 1898, y: 1055, align: 'right' },
    title: {
      em: 82, baseline: 108, centerX: 790, scaleX: 0.97, maxW: 1460,
      fill: [[0, '#5891D5'], [1, '#6ED2FE']],
      // Splash 标题：半透明蓝白外沿在底，字芯+白边的阴影压在外沿上面。
      stroke: '#ffffff', strokeW: 11,
      keyline: 'rgba(207, 233, 246, 0.72)', keylineW: 27,
      keylineGradient: [[0, 'rgba(235, 248, 252, 0.82)'], [1, 'rgba(160, 207, 232, 0.68)']],
      layeredKeyline: true,
      shadow: { color: 'rgba(38, 55, 66, 0.30)', blur: 3, dy: 3 }
    }
  },
  splashplus: {
    // Splash PLUS 独立版式：透明灰蓝外壳、无 NEW 圆饼，卡面沿用 Splash 六色模板。
    logo: { x: 38, y: 17, h: 100 },
    sega: { x: 1744, y: 18, w: 158, h: 55 },
    credit: { x: 24, y: 1060, align: 'left' },
    title: {
      ...DX2022_TITLE_STYLE,
      baseline: 127, centerX: 960, maxW: 1280
    }
  },
  magical: {
    // MAGiCAL（用户 PSD 逐层实测）: 单卡版式
    psd: true,
    assets: 'magical',
    headerH: 206.3,                    // 220 × .9375（新版 header 含出血）
    headerRect: { x: -13.1, y: -10.3, w: 1935, h: 206.3 },   // PSD header 层 (-14,-11) 2064×220
    title: {
      // 标题中点以 MAGiCAL header 左右两根柱子为框：柱心画布 x≈322/1593 → 中点 957.2，
      // 构图平衡左侧大 logo 再右偏 28px（用户 2026-09-30 定的视觉平衡位），全家族共用这一个值。
      em: 75.7, baseline: 104.6, scaleX: 1, tracking: -0.76, center: 985, maxW: 1200,
      fill: [[0, '#ffffff'], [0.4, '#ffffff'], [1, '#acffde']],
      // 描边累计扩展（外→内）：白 25 → 深绿 12 → 中绿 4（PSD 嵌套组 13+8+4，每层在前一层外缘再外扩）
      strokes: [
        { color: '#ffffff', w: 46.9 },
        { color: '#22400a', w: 22.5 },
        { color: '#259436', w: 7.5 }
      ],
      shadowColorSolid: '#0b5d29',     // PSD 投影 #0b5d29 100% 不透明
      shadowDy: 10.3,                  // PSD 实测可见下探 11px（Dstn 9 + blur3/choke100 外扩 2）× .9375
      family: "'FOT-NewRodin Pro'", weight: 900
    },
    card: {
      w: 495.9, h: 645.9, left: 712.5, top: 341.3,      // PSD (760,364) 529×689
      art: { x: 24.4, y: 23.4, w: 448.1, h: 448.1 },
      name: { cy: 0.807, sizeSingle: 0.0698, size: 0.055, min: 0.038, color: '#e9e143', weight: 900, tracking: 0, family: "'FOT-NewRodin Pro'", maxLines: 2 },
      artist: { cy: 0.931, sizeSingle: 0.0539, size: 0.045, min: 0.032, color: '#ffffff', weight: 700, tracking: 0, family: "'FOT-NewRodin Pro'", maxLines: 2 }
    },
    // 多卡版式（用户规则）：≤4 首一行显示（带新曲标签）；≥5 首分两行（上行 ceil，与中二一致），隐藏标签
    grid: {
      gap: 63.75,          // 一行时的卡间距（2048 空间 68）
      rows: {
        top: 206,          // 双行时行1 顶（无徽章，整体上移占满）
        gap: 26,
        cardH: 412, cardW: 316.3, rowPitch: 438
      }
    },
    // 徽章素材已把 PSD 的 4px 白环烘进图（611×122 = 603×114 + 环），
    // 绘制矩形按「含环」算：PSD 图层 (723,217) 外扩 4px → (719,213)
    badge: { x: 674.1, y: 199.7, w: 572.8 },
    badgeLift: 44   // 关掉徽章后单行卡片上移的像素（1920 空间）
  },
  earlyDx: {
    // 最早期（DX/PLUS）：共享背景与版式，只在 UI 中切换右上版本 logo。
    // 卡片按 2019 官方公告图重绘：彩色厚框 + 米白内衬 + 方形曲绘 + 黑/灰双层文字带。
    logo: null,
    sega: { x: 14, y: 996, w: 205, h: 68 },
    credit: { x: 1896, y: 1052, align: 'right' },
    title: {
      ...DX_CLASSIC_TITLE_STYLE,
      baseline: 123, centerX: 820, maxW: 1500
    },
    card: {
      ratio: 1210 / 1025,
      art: { x: 0.104, y: 0.066, w: 0.795, h: 0.659 },
      name: { cy: 0.824, size: 0.071, color: '#ffffff', weight: 900 },
      artist: { cy: 0.9, size: 0.041, color: '#ffffff', weight: 700 },
      shadow: { color: 'rgba(22,72,108,0.34)', blur: 8, dy: 7 }
    },
    grid: { cardW: 285, top1: 190, rowPitch: 400, pitch: 320 },
    single: {
      1: { w: 475, top: 300, gap: 0 },
      2: { w: 475, top: 300, gap: 90 },
      3: { w: 475, top: 300, gap: 55 },
      4: { w: 430, top: 304, gap: 33 },
      5: { w: 365, top: 354, gap: 15 }
    },
    badge: null
  }
}

/* PSD 家族（MAGiCAL / CiRCLE / CiRCLE PLUS，用户 PSD 逐层实测）：
   版式、卡片框、徽章完全一致，每个版本只差 bg / header 与标题三层描边配色。 */
FAMILIES.circleplus = {
  ...FAMILIES.magical,
  assets: 'circleplus',
  headerRect: { x: -90, y: -256.9, w: 2100, h: 1417.5 },   // PSD header 层 (-96,-274) 2240×1512
  title: {
    ...FAMILIES.magical.title,
    fill: [[0, '#fbffef'], [0.369, '#f9ff91'], [1, '#cfff5b']],   // PSD 渐变 -90°: 近白 → 黄绿 → 亮黄绿
    strokes: [
      { color: '#fffdff', w: 46.9 },
      { color: '#1d1fc1', w: 22.5 },
      { color: '#eb35d5', w: 7.5 }
    ],
    shadowColorSolid: '#eb61c7',
    shadowDy: 6.6
  }
}
// CiRCLE 与 CiRCLE PLUS 的 PSD 效果参数完全相同（标题配色/描边/投影逐项一致），仅 bg/header 不同
FAMILIES.circle = {
  ...FAMILIES.circleplus,
  assets: 'circle',
  headerRect: { x: -20.6, y: -20.6, w: 1961.25, h: 210.9 }  // PSD header 层 (-22,-22) 2092×225
}

/* festival～PRiSM PLUS 六版：完全复用 MAGiCAL 链路（卡片框/排布/徽章/标题机制像素级共用），
   每版只差：bg / logo（用户自制 header 就位前仍用旧横幅+logo）/ 标题描边与填充配色。
   headerRect 为空 → 走过渡态（旧 banner + logo + SEGA）；用户把 header-{ver}.png 放进
   assets/（含出框效果、带底部纯色分界线）后自动启用。 */
FAMILIES.festival = {
  ...FAMILIES.magical,          // 标题/卡片/排布/徽章全部继承 MAGiCAL，版本表里只覆写描边色
  assets: 'festival',
  headerRect: null,
  // 过渡态旧横幅/角标定位（自制 header 就位后不再使用）
  bandH: 161,
  logo: { x: 14, y: 9, h: 129 },
  sega: { x: 1734, y: 9, w: 169, h: 70 }
}

/** PRiSM / PRiSM PLUS 共用标题配色（官方公告图逐像素实测：白外圈 → 蓝粗边 → 粉细内线 → 奶白→鲑粉填充） */
const MAI_TITLE_PINK = {
  fill: [[0, '#fffef9'], [0.35, '#fffaea'], [0.6, '#fde3c4'], [0.8, '#f8bfa2'], [1, '#f2a293']],
  strokes: [{ color: '#ffffff', w: 30.3 }, { color: '#3452c8', w: 14.4 }, { color: '#f5799f', w: 5 }],
  shadowColorSolid: '#f8a6b8', shadowDy: 5
}

/** 版本 → 家族/素材配置（背景先用占位渐变，待用户供图）
 *  title 覆盖项来自各时代官方「楽曲追加」图实测；band 为抠取的横幅平铺图 key。 */
export const MAI_VERSIONS = {
  deradx:       { label: 'maimaiでらっくす / PLUS', family: 'earlyDx', logo: logoDx, plusLogo: logoDxplus, earlyBg: 'dx', tint: ['#bfe8ff', '#8ec9ff'] },
  splash:       { label: 'maimaiでらっくす Splash', family: 'splash', logo: logoSplash, earlyBg: 'splash', tint: ['#7de2c4', '#ffe100'] },
  splashplus:   { label: 'maimaiでらっくす Splash PLUS', family: 'splashplus', logo: logoSplashplus, earlyBg: 'splashplus', tint: ['#bfe8ff', '#8fd4ff'] },
  universe:     { label: 'maimaiでらっくす UNiVERSE / PLUS', family: 'universe', bg: 'universe', logo: logoUniverse, tint: ['#ffb3d9', '#8ec9ff'] },
  universeplus: { label: 'maimaiでらっくす UNiVERSE PLUS', family: 'universe', bg: 'universe', logo: logoUniverseplus, tint: ['#ffb3d9', '#8ec9ff'] },
  festival:     { label: 'maimaiでらっくす FESTiVAL / PLUS', family: 'festival', band: 'festival', bg: 'festival', psdAssets: 'festival', logo: logoFestival, tint: ['#e3b7ff', '#ffd6f2'],
                  festivalLogoSelector: true,
                  cnLogoRect: { x: 24, y: 5, w: 230 },
                  title: { fill: [[0, '#fffef5'], [0.32, '#fffbd0'], [0.58, '#fff25a'], [1, '#f5d900']],
                           strokes: [{ color: '#ffffff', w: 46.9 }, { color: '#7220b5', w: 23.5 }, { color: '#b942e8', w: 7.5 }],
                           shadowColorSolid: '#7b25bd', shadowDy: 7 } },
  festivalplus: { label: 'maimaiでらっくす FESTiVAL PLUS', family: 'festival', band: 'festival', bg: 'festivalplus', psdAssets: 'festivalplus', logo: logoFestivalplus, tint: ['#e3b7ff', '#ffd6f2'],
                  title: { strokes: [{ color: '#ffffff', w: 46.9 }, { color: '#8c2fe2', w: 22.5 }, { color: '#a855f7', w: 7.5 }], shadowColorSolid: '#8c2fe2' } },
  buddies:      { label: 'maimaiでらっくす BUDDiES',       family: 'festival', bg: 'buddies', psdAssets: 'buddies',      logo: logoBuddies, tint: ['#ffe9c9', '#ffd06b'],
                  // 背景素材是官方公告图（横幅/十字闪星含在里面）；logo/SEGA 从背景里擦掉，这里用高清素材补画
                  topLogos: true,
                  logoRect: { x: 23, y: 1, w: 268 },
                  cnLogo: true,
                  cnLogoKey: 'maiCn2024Logo',
                  cnLogoRect: { x: 23, y: 3, w: 190 },
                  segaRect: { x: 1743, y: 19, w: 149, h: 50 },
                  decoRect: { x: 1751, y: 45, w: 169, h: 283 },   // 出框的十字闪星（压在卡片之上）
                  // 官方标题阴影是半透明纯黑错位投影
                  title: { fill: [[0, '#fffdf0'], [0.35, '#fff1a8'], [1, '#ffe500']],
                           strokes: [{ color: '#ffffff', w: 46.9 }, { color: '#1e1a7d', w: 22.5 }, { color: '#e95b8a', w: 7.5 }],
                           shadowColorSolid: 'rgba(0, 0, 0, 0.28)', shadowDy: 7 } },
  buddiesplus:  { label: 'maimaiでらっくす BUDDiES PLUS',  family: 'festival', bg: 'buddiesplus', psdAssets: 'buddiesplus', logo: logoBuddiesplus, tint: ['#ffe9c9', '#ffd06b'],
                  // 同上：BUDDiES PLUS 与 BUDDiES 版式一致，只有背景/logo 不同
                  topLogos: true,
                  logoRect: { x: 23, y: 1, w: 286 },
                  segaRect: { x: 1743, y: 19, w: 149, h: 50 },
                  decoRect: { x: 1751, y: 45, w: 169, h: 283 },
                  title: { fill: [[0, '#fffdf0'], [0.35, '#fff1a8'], [1, '#ffe500']],
                           strokes: [{ color: '#ffffff', w: 46.9 }, { color: '#1e1a7d', w: 22.5 }, { color: '#e95b8a', w: 7.5 }],
                           shadowColorSolid: 'rgba(0, 0, 0, 0.28)', shadowDy: 7 } },
  prism:        { label: 'maimaiでらっくす PRiSM',         family: 'festival', bg: 'prism', psdAssets: 'prism',     logo: logoPrism, tint: ['#c9f5ec', '#9ee8ff'],
                  // 背景素材本身就是官方公告图（横幅已含在里面），不再叠旧横幅；logo/SEGA 为独立图层
                  topLogos: true,
                  logoRect: { x: 14, y: 4, w: 315 },
                  cnLogo: true,
                  cnLogoKey: 'maiCn2025Logo',
                  cnLogoRect: { x: 68, y: 7, w: 230 },
                  // SEGA 用官方公告图实测的等比框（素材为 3:1 的 logo，按比例缩放不拉伸）
                  segaRect: { x: 1743, y: 15, w: 157, h: 52 },
                  title: MAI_TITLE_PINK },
  prismplus:    { label: 'maimaiでらっくす PRiSM PLUS',    family: 'festival', bg: 'prismplus', psdAssets: 'prismplus', logo: logoPrismplus, tint: ['#c9f5ec', '#9ee8ff'],
                  // 背景素材本身就是官方公告图（横幅已含在里面），不再叠旧横幅；logo/SEGA/下沿装饰云为独立图层
                  topLogos: true,
                  logoRect: { x: 25, y: 20, w: 326 },
                  cnLogo: true,
                  cnLogoRect: { x: 56, y: 8, w: 271 },
                  segaRect: { x: 1740, y: 12, w: 160, h: 66 },
                  decoRect: { x: 1500, y: 150, w: 420, h: 51.6 },
                  title: MAI_TITLE_PINK },
  circle:       { label: 'maimaiでらっくす CiRCLE',        family: 'circle', logo: logoCircle, tint: ['#ffd6f2', '#ffb3e6'],
                  cnLogo: true, cnLogoKey: 'maiCn2027Logo', cnLogoRect: { x: 29, y: 5, w: 210 },
                  cnLogoOutline: { color: '#ffffff', width: 4.5 }, headerCnSwap: true },
  circleplus:   { label: 'maimaiでらっくす CiRCLE PLUS',   family: 'circleplus', logo: logoCircleplus, tint: ['#ffd6f2', '#ffb3e6'] },
  // MAGiCAL 时代的「楽曲追加」图样尚未公布（版本 2026-09-17 刚稼动），暂用 circle 横幅 + 绿标题近似，待官方图样后校准
  magical:      { label: 'maimaiでらっくす MAGiCAL',       family: 'magical', logo: logoMagical, tint: ['#d19eff', '#9effd1'] }
}

/* ================= 主题级素材清单（按需加载） =================
 * 视图切到某个舞萌主题（或改 UI 开关）时只取这一份清单去懒加载：chuni 全套 21MB、mai 全套 69MB，
 * 一次性预载首屏扛不住。已加载的图片由调用方永久缓存，切主题只补新增项；同一 URL 在多个版本
 * 重复出现时由加载器按 URL 全局去重。
 *
 * entries 的 path 与渲染器实际读取的 imgs 路径一一对应（逐家族 grep 核对过）：
 *  - deradx（earlyDx → renderMaiEarlyDx）：
 *      maiEarlyBgs.dx / logosMai.deradx|plus 或 maiCnDxLogo|maiCn2021Logo|maiCn2022Logo /
 *      maiEarly.cardDxGreen / maiSega
 *  - splash（ → renderMaiSplash）：maiEarlyBgs.splash(+splashAlt) / logosMai.splash /
 *      maiSplashCards[0..5] / maiSega
 *  - splashplus（ → renderMaiSplashPlus）：maiEarlyBgs.splashplus / logosMai.splashplus /
 *      maiSplashCards[0..5] / maiSega
 *  - universe / universeplus（renderMai 普通路径）：maiPsd.universe.bg / logosMai.universe|universeplus /
 *      maiMagicalCards 六色 / maiSega
 *  - PSD 家族（renderMaiMagical）：maiPsd[psdAssets].bg / header（magical / circleplus；circle 勾国服时换 headerCn）/
 *      maiBands[ver.band]（仅 festival / festivalplus 的过渡态）/ logosMai[version] 或国服 logo /
 *      maiPsd[psdAssets].deco（buddies / buddiesplus / prismplus）/ maiSega / maiPsd[psdAssets].badge /
 *      maiMagicalCards 六色
 *
 * ui 开关只把「该状态下真的会画」的 logo 计入：useCnLogo（buddies/prism/prismplus 左上国服 logo、
 * circle 清洁顶栏+2027 logo）、dxLogoVariant（deradx 五选一）、festivalLogoVariant（festival 三选一）、
 * universeLogoVariant（universe 的 base/plus）；splash 的 splashAltBg 两张背景都列入 entries，
 * 但 primary 固定主背景（maiBgReady() 只认 maiEarlyBgs.splash）。
 */
const MAI_PSD_BANK_URLS = { magical: MAI_MAGICAL_URLS, circleplus: MAI_CIRCLEPLUS_URLS, circle: MAI_CIRCLE_URLS }
/** imgs 上的国服 logo 键名 → URL（渲染器按 cnLogoKey / 'maiCnLogo' 取值） */
const MAI_CN_LOGO_BY_KEY = {
  maiCnLogo: MAI_CN_LOGO_URL,
  maiCnDxLogo: MAI_CN_DX_LOGO_URL,
  maiCn2021Logo: MAI_CN_2021_LOGO_URL,
  maiCn2022Logo: MAI_CN_2022_LOGO_URL,
  maiCn2023Logo: MAI_CN_2023_LOGO_URL,
  maiCn2024Logo: MAI_CN_2024_LOGO_URL,
  maiCn2025Logo: MAI_CN_2025_LOGO_URL,
  maiCn2027Logo: MAI_CN_2027_LOGO_URL
}

/**
 * 列出某个舞萌主题真正需要的图片素材，供加载器按主题懒加载写入共享图片池 imgs。
 *
 * ⚠️ 维护约定：新增版本 / 新渲染家族时，必须按下面的渲染分支补全对应 path，否则该元素会静默缺失
 *    （渲染器的 blit 会跳过 undefined，不报错）。改动渲染器读取点时要同步检查这里。
 *
 * @param {string} version MAI_VERSIONS 的键；不识别时回退到 festival（与 renderMai 一致）
 * @param {{useCnLogo?:boolean, dxLogoVariant?:string, festivalLogoVariant?:string, universeLogoVariant?:string, splashAltBg?:boolean}} ui
 *   当前 UI 状态（默认值与视图一致：jp / base / 不勾国服 logo / 不勾条纹背景）
 * @returns {{ primary: string, entries: Array<{ url: string, path: Array<string|number> }> }}
 *   primary = 该版本主背景 URL（renderMai 的 maiBgReady() 判定就是这张图）；
 *   path 依次作为 imgs 的键/下标写入，例如 ['maiPsd','magical','bg']、['maiMagicalCards','cardGreen']、
 *   ['maiEarlyBgs','dx']、['logosMai','magical']、['maiSega']，中间层由加载器自动创建。
 */
export function maiThemeAssets(version, ui = {}) {
  const key = typeof version === 'string' && Object.prototype.hasOwnProperty.call(MAI_VERSIONS, version) ? version : 'festival'
  const ver = MAI_VERSIONS[key]
  const fam = FAMILIES[ver.family] || {}
  const opts = ui || {}
  const entries = []
  const add = (url, path) => {
    if (typeof url === 'string' && url) entries.push({ url, path })
  }
  const addMagicalCards = () => {
    for (const cardKey of MAI_MAGICAL_CARD_KEYS) add(MAI_MAGICAL_CARD_URLS[cardKey], ['maiMagicalCards', cardKey])
  }
  const addSega = () => add(MAI_ASSET_URLS.sega, ['maiSega'])

  // ---- 早期 dx 家族（deradx）：程序化卡片 + 版本背景/logo/SEGA ----
  if (ver.family === 'earlyDx') {
    add(MAI_EARLY_BG_URLS[ver.earlyBg], ['maiEarlyBgs', ver.earlyBg])
    const dxVariant = opts.dxLogoVariant || 'jp'
    if (dxVariant === 'cn') add(MAI_CN_DX_LOGO_URL, ['maiCnDxLogo'])
    else if (dxVariant === 'cn2021') add(MAI_CN_2021_LOGO_URL, ['maiCn2021Logo'])
    else if (dxVariant === 'cn2022') add(MAI_CN_2022_LOGO_URL, ['maiCn2022Logo'])
    else if (dxVariant === 'plus') add(ver.plusLogo, ['logosMai', 'plus'])
    else add(ver.logo, ['logosMai', 'deradx'])
    add(MAI_EARLY_URLS.cardDxGreen, ['maiEarly', 'cardDxGreen'])
    addSega()
    return { primary: MAI_EARLY_BG_URLS[ver.earlyBg], entries }
  }

  // ---- Splash / Splash PLUS：独立版式，六色卡面模板都在 maiSplashCards ----
  if (ver.family === 'splash' || ver.family === 'splashplus') {
    const isSplash = ver.family === 'splash'
    if (isSplash) {
      // 官方两种背景：默认黄色热带款，勾选后换米白条纹款；两张都先载好，切换开关无需再等
      add(MAI_EARLY_BG_URLS.splash, ['maiEarlyBgs', 'splash'])
      add(MAI_EARLY_BG_URLS.splashAlt, ['maiEarlyBgs', 'splashAlt'])
    } else {
      add(MAI_EARLY_BG_URLS.splashplus, ['maiEarlyBgs', 'splashplus'])
    }
    add(ver.logo, ['logosMai', ver.family])
    MAI_SPLASH_CARD_URLS.forEach((url, i) => add(url, ['maiSplashCards', i]))
    addSega()
    return { primary: MAI_EARLY_BG_URLS[isSplash ? 'splash' : 'splashplus'], entries }
  }

  // ---- UNiVERSE / UNiVERSE PLUS（renderMai 普通路径）：背景 + 版本 logo + MAGiCAL 六色卡 + SEGA ----
  if (ver.family === 'universe') {
    // renderMai 里 logoKey = (universe 且切了 PLUS) ? 'universeplus' : state.version
    const logoKey = key === 'universeplus' || opts.universeLogoVariant === 'plus' ? 'universeplus' : 'universe'
    add(MAI_MODERN_BG_URLS.universe, ['maiPsd', 'universe', 'bg'])
    add(MAI_VERSIONS[logoKey].logo, ['logosMai', logoKey])
    addMagicalCards()
    addSega()
    return { primary: MAI_MODERN_BG_URLS.universe, entries }
  }

  // ---- PSD 家族（MAGiCAL / CiRCLE / CiRCLE PLUS / FESTiVAL～PRiSM PLUS）：renderMaiMagical ----
  const bankKey = ver.psdAssets || fam.assets || 'magical'
  const bankUrls = MAI_PSD_BANK_URLS[bankKey]
  const primary = bankUrls ? bankUrls.bg : MAI_MODERN_BG_URLS[bankKey]
  add(primary, ['maiPsd', bankKey, 'bg'])
  // 自带 PSD 顶栏的家族：magical / circleplus 用 header；circle 勾国服 logo 时换清洁顶栏 headerCn 并补 2027 logo
  if (bankUrls && bankUrls.header) {
    if (ver.headerCnSwap && opts.useCnLogo) {
      if (bankUrls.headerCn) add(bankUrls.headerCn, ['maiPsd', bankKey, 'headerCn'])
      if (ver.cnLogoKey) add(MAI_CN_LOGO_BY_KEY[ver.cnLogoKey], [ver.cnLogoKey])
    } else {
      add(bankUrls.header, ['maiPsd', bankKey, 'header'])
    }
  }
  // FESTiVAL 家族：FAMILIES.festival.headerRect 为空 → 走「旧横幅 + 版本 logo + SEGA」过渡态
  if (ver.family === 'festival') {
    // 只有 festival / festivalplus 在版本表里写了 band；buddies 系 / PRiSM 系没有 banner
    if (ver.band) add(MAI_BAND_URLS[ver.band], ['maiBands', ver.band])
    const useCn = !!(ver.cnLogo && opts.useCnLogo)
    if (ver.festivalLogoSelector) {
      // 仅 festival：FESTiVAL / FESTiVAL PLUS / 国服 2023 三选一
      const variant = opts.festivalLogoVariant || 'jp'
      if (variant === 'plus') add(MAI_VERSIONS.festivalplus.logo, ['logosMai', 'festivalplus'])
      else if (variant === 'cn2023') add(MAI_CN_2023_LOGO_URL, ['maiCn2023Logo'])
      else add(ver.logo, ['logosMai', 'festival'])
    } else if (!useCn) {
      // buddies / buddiesplus / prism / prismplus：过渡态或 topLogos 都读 logosMai[state.version]；
      // 但勾了国服 logo 的 buddies / prism / prismplus 只画国服 logo（topLogos 的 useCn 分支）
      add(ver.logo, ['logosMai', key])
    }
    if (useCn) {
      // PRiSM PLUS 版本表没写 cnLogoKey，渲染器 imgs[ver.cnLogoKey || 'maiCnLogo'] 同样回退到 maiCnLogo
      const cnKey = ver.cnLogoKey || 'maiCnLogo'
      add(MAI_CN_LOGO_BY_KEY[cnKey], [cnKey])
    }
    // 出框装饰云（buddies / buddiesplus / prismplus 才有素材与 decoRect）
    if (ver.decoRect) add(MAI_MODERN_DECO_URLS[bankKey], ['maiPsd', bankKey, 'deco'])
    addSega()
  }
  // 徽章：渲染器读 bank.badge（festival 家族没有独立 badge，落在同一路径也不会打架，URL 都是 badge-magical）
  add(bankUrls ? bankUrls.badge : MAI_MAGICAL_URLS.badge, ['maiPsd', bankKey, 'badge'])
  addMagicalCards()

  return { primary, entries }
}

/* ================= 工具 ================= */

function lighten(hex, ratio) {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.round(((n >> 16) & 255) * (1 - ratio) + 255 * ratio)
  const g = Math.round(((n >> 8) & 255) * (1 - ratio) + 255 * ratio)
  const b = Math.round((n & 255) * (1 - ratio) + 255 * ratio)
  return `rgb(${r},${g},${b})`
}

/** 占位背景（正式背景图待用户供给后替换为 drawImage） */
function drawBg(ctx, tint) {
  const grad = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H)
  grad.addColorStop(0, lighten(tint[0], 0.72))
  grad.addColorStop(1, lighten(tint[1], 0.72))
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
}



/* ================= 标题 ================= */
function drawTitle(ctx, text, cfg) {
  const lines = String(text || ' ').split('\n').filter((l, i, arr) => l.trim() !== '' || arr.length === 1)
  const k = cfg.scaleX || 1
  const scaleY = cfg.scaleY || 1
  const titleFamily = cfg.family || FONT
  ctx.save()
  let em = cfg.em
  const fit = (size) => {
    ctx.font = `900 ${size}px ${titleFamily}`
    return Math.max(...lines.map((l) => ctx.measureText(l || ' ').width))
  }
  while (fit(em) * k > cfg.maxW && em > 56) em -= 2
  ctx.restore()

  const lineHeight = em * 1.08
  const baseline0 = cfg.baseline - ((lines.length - 1) * lineHeight) / 2

  const gradTop = baseline0 - em * 0.95
  const gradBot = baseline0 + (lines.length - 1) * lineHeight + em * 0.12
  const makeLayer = () => {
    const layer = document.createElement('canvas')
    layer.width = Math.ceil(CANVAS_W / k)
    layer.height = CANVAS_H
    const lc = layer.getContext('2d')
    lc.font = `900 ${em}px ${titleFamily}`
    lc.textAlign = 'center'
    lc.textBaseline = 'alphabetic'
    lc.lineJoin = 'round'
    lc.miterLimit = 2
    return { layer, lc }
  }
  const tx = (cfg.centerX == null ? CANVAS_W / 2 : cfg.centerX) / k
  // 只压缩标题图层的纵向尺寸，并以基线为锚点；避免用横向拉伸伪造低矮宽体。
  const blitTitleLayer = (target, layer) => {
    const dy = cfg.baseline * (1 - scaleY)
    blit(target, layer, 0, 0, layer.width, CANVAS_H, 0, dy, CANVAS_W, CANVAS_H * scaleY)
  }

  if (cfg.layeredKeyline) {
    const outer = makeLayer()
    let outerStyle = cfg.keyline
    if (cfg.keylineGradient) {
      outerStyle = outer.lc.createLinearGradient(0, gradTop, 0, gradBot)
      for (const [pos, col] of cfg.keylineGradient) outerStyle.addColorStop(pos, col)
    }
    outer.lc.strokeStyle = outerStyle
    outer.lc.lineWidth = cfg.keylineW
    lines.forEach((line, i) => outer.lc.strokeText(line, tx, baseline0 + i * lineHeight))
    blitTitleLayer(ctx, outer.layer)

    const inner = makeLayer()
    const fill = inner.lc.createLinearGradient(0, gradTop, 0, gradBot)
    for (const [pos, col] of cfg.fill) fill.addColorStop(pos, col)
    inner.lc.fillStyle = fill
    inner.lc.strokeStyle = cfg.stroke
    inner.lc.lineWidth = cfg.strokeW
    lines.forEach((line, i) => {
      const by = baseline0 + i * lineHeight
      inner.lc.strokeText(line, tx, by)
      inner.lc.fillText(line, tx, by)
    })
    ctx.save()
    ctx.shadowColor = cfg.shadow.color
    ctx.shadowBlur = cfg.shadow.blur
    ctx.shadowOffsetX = cfg.shadow.dx || 0
    ctx.shadowOffsetY = cfg.shadow.dy
    blitTitleLayer(ctx, inner.layer)
    ctx.restore()
    return
  }

  const { layer, lc } = makeLayer()
  const fill = lc.createLinearGradient(0, gradTop, 0, gradBot)
  for (const [pos, col] of cfg.fill) fill.addColorStop(pos, col)
  lc.fillStyle = fill
  lines.forEach((line, i) => {
    const by = baseline0 + i * lineHeight
    if (cfg.extrusion) {
      const backY = by + cfg.extrusion.dy
      for (const stroke of cfg.extrusion.strokes) {
        lc.strokeStyle = stroke.color
        lc.lineWidth = stroke.w
        lc.strokeText(line, tx, backY)
      }
      lc.fillStyle = cfg.extrusion.fill
      lc.fillText(line, tx, backY)
      lc.fillStyle = fill
    }
    if (cfg.strokes) {
      for (const stroke of cfg.strokes) {
        lc.strokeStyle = stroke.color
        lc.lineWidth = stroke.w
        lc.strokeText(line, tx, by)
      }
    } else {
      lc.strokeStyle = cfg.keyline
      lc.lineWidth = cfg.keylineW
      lc.strokeText(line, tx, by)
      lc.strokeStyle = cfg.stroke
      lc.lineWidth = cfg.strokeW
      lc.strokeText(line, tx, by)
    }
    lc.fillText(line, tx, by)
  })
  ctx.save()
  ctx.shadowColor = cfg.shadow.color
  ctx.shadowBlur = cfg.shadow.blur
  ctx.shadowOffsetX = cfg.shadow.dx || 0
  ctx.shadowOffsetY = cfg.shadow.dy
  blitTitleLayer(ctx, layer)
  ctx.restore()
}

/* ================= 卡片 ================= */

function fitText(ctx, text, maxW, baseSize, weight) {
  let size = baseSize
  ctx.font = `${weight} ${size}px ${FONT}`
  while (ctx.measureText(text).width > maxW && size > baseSize * 0.45) {
    size -= 1
    ctx.font = `${weight} ${size}px ${FONT}`
  }
  return size
}

function drawBandText(ctx, text, cx, cy, size, weight, color, maxW) {
  if (!text) return
  const s = fitText(ctx, text, maxW, size, weight)
  ctx.save()
  ctx.font = `${weight} ${s}px ${FONT}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = color
  ctx.fillText(text, cx, cy)
  ctx.restore()
}

function drawCard(ctx, song, x, y, w, h, cardImg, fam) {
  const c = fam.card
  // 投影
  ctx.save()
  ctx.shadowColor = c.shadow.color
  ctx.shadowBlur = c.shadow.blur * (w / 299)
  ctx.shadowOffsetY = c.shadow.dy
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, 10 * (w / 299))
  ctx.fill()
  ctx.restore()

  // 曲绘（cover-fit 进透明窗）
  const ax = x + w * c.art.x
  const ay = y + h * c.art.y
  const aw = w * c.art.w
  const ah = h * c.art.h
  ctx.save()
  ctx.beginPath()
  ctx.rect(ax, ay, aw, ah)
  ctx.clip()
  if (song.artImg && song.artImg.width > 1) {
    const img = song.artImg
    const scale = Math.max(aw / img.width, ah / img.height)
    const dw = img.width * scale
    const dh = img.height * scale
    blit(ctx, img, ax + (aw - dw) / 2, ay + (ah - dh) / 2, dw, dh)
  } else {
    ctx.fillStyle = '#e8e8ee'
    ctx.fillRect(ax, ay, aw, ah)
  }
  ctx.restore()

  // 官方卡片模板
  blit(ctx, cardImg, x, y, w, h)

  // 藏青带文字
  drawBandText(ctx, song.name, x + w / 2, y + h * c.name.cy, h * c.name.size, c.name.weight, c.name.color, w - 26)
  drawBandText(ctx, song.artist, x + w / 2, y + h * c.artist.cy, h * c.artist.size, c.artist.weight, c.artist.color, w - 26)
}

/** UNiVERSE 卡片：后期彩框本体 + 独立窄玻璃壳；曲绘覆盖模板中的示例图。 */
function drawUniverseCard(ctx, song, x, y, w, h, cardImg, fam) {
  const c = fam.card
  drawUniverseGlassShell(ctx, x, y, w, h)
  blit(ctx, cardImg, x, y, w, h)

  const ax = x + w * c.art.x
  const ay = y + h * c.art.y
  const aw = w * c.art.w
  const ah = h * c.art.h
  ctx.save()
  ctx.beginPath()
  ctx.rect(ax, ay, aw, ah)
  ctx.clip()
  if (song.artImg && song.artImg.width > 1) {
    const img = song.artImg
    const scale = Math.max(aw / img.width, ah / img.height)
    const dw = img.width * scale
    const dh = img.height * scale
    blit(ctx, img, ax + (aw - dw) / 2, ay + (ah - dh) / 2, dw, dh)
  } else {
    ctx.fillStyle = '#edf1f3'
    ctx.fillRect(ax, ay, aw, ah)
  }
  ctx.restore()

  drawBandText(ctx, song.name, x + w / 2, y + h * c.name.cy, h * c.name.size, c.name.weight, c.name.color, w - 28)
  drawBandText(ctx, song.artist, x + w / 2, y + h * c.artist.cy, h * c.artist.size, c.artist.weight, c.artist.color, w - 28)
}

/* ================= 网格布局 ================= */
function gridRects(fam, n) {
  const g = fam.grid
  const rects = []
  if (n <= 0) return rects
  if (n <= 5) {
    const lay = fam.single[n] || { w: g.cardW, top: 195, gap: g.pitch - g.cardW }
    const w = lay.w
    const h = w * fam.card.ratio
    const rowW = n * w + (n - 1) * lay.gap
    let x = (CANVAS_W - rowW) / 2
    for (let i = 0; i < n; i++) { rects.push({ x, y: lay.top, w, h }); x += w + lay.gap }
    return rects
  }
  // 两行（6~10）：上 ceil(n/2)
  const topCount = Math.ceil(n / 2)
  const w = g.cardW
  const h = w * fam.card.ratio
  const rows = [topCount, n - topCount]
  rows.forEach((count, ri) => {
    const y = ri === 0 ? g.top1 : g.top1 + g.rowPitch
    const rowW = count * w + (count - 1) * (g.pitch - w)
    let x = (CANVAS_W - rowW) / 2
    for (let i = 0; i < count; i++) { rects.push({ x, y, w, h }); x += g.pitch }
  })
  return rects
}

/* ================= 早期 splash 家族 ================= */

/** 绿面板卡模板按流派色 hue 旋转（缓存） */
const earlyCardCache = new Map()
function getEarlyCard(img, hueDeg) {
  const key = `${hueDeg}`
  if (earlyCardCache.has(key)) return earlyCardCache.get(key)
  const cv = document.createElement('canvas')
  cv.width = img.width
  cv.height = img.height
  const c2 = cv.getContext('2d', { willReadFrequently: true })
  c2.drawImage(img, 0, 0)
  const d = c2.getImageData(0, 0, cv.width, cv.height)
  const px = d.data
  for (let i = 0; i < px.length; i += 4) {
    if (px[i + 3] === 0) continue
    const r = px[i], g = px[i + 1], b = px[i + 2]
    // 只旋绿色主导像素（面板），白框/藏青带不动
    if (g > r + 18 && g > b + 18) {
      const [h, s2, l] = rgbToHsl(r, g, b)
      const [r2, g2, b2] = hslToRgb((h + hueDeg + 360) % 360, s2, l)
      px[i] = r2; px[i + 1] = g2; px[i + 2] = b2
    }
  }
  c2.putImageData(d, 0, 0)
  earlyCardCache.set(key, cv)
  return cv
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b)
  const l = (mx + mn) / 2
  if (mx === mn) return [0, 0, l]
  const d = mx - mn
  const s2 = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn)
  let h
  if (mx === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60
  else if (mx === g) h = ((b - r) / d + 2) * 60
  else h = ((r - g) / d + 4) * 60
  return [h, s2, l]
}
function hslToRgb(h, s2, l) {
  const k = (n) => (n + h / 30) % 12
  const a = s2 * Math.min(l, 1 - l)
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
}

/** 早期徽章：Qwen 洗净的柠檬圆盘 + 三行程序化文字（首行随曲数变化，整组微右倾） */
function drawEarlyBadge(ctx, imgs, count) {
  const img = imgs.maiEarly && imgs.maiEarly.badge
  if (!img) return
  const size = 400
  const x = 1697 - size / 2
  const y = 197 - size / 2
  blit(ctx, img, x, y, size, size)
  const lines = [
    { t: `${count}曲まとめて`, cy: 0.31, em: 0.13,  fill: '#5fbe58' },
    { t: 'すぐに遊べる',       cy: 0.53, em: 0.18,  fill: '#fb3464' },
    { t: '新曲！',             cy: 0.78, em: 0.235, fill: '#fb3464' }
  ]
  ctx.save()
  ctx.translate(x + size / 2, y + size / 2)
  ctx.rotate(0.09)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.lineJoin = 'round'
  for (const L of lines) {
    ctx.font = `900 ${Math.round(L.em * size)}px ${FONT}`
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = size * 0.05
    ctx.strokeText(L.t, 0, (L.cy - 0.5) * size)
    ctx.fillStyle = L.fill
    ctx.fillText(L.t, 0, (L.cy - 0.5) * size)
  }
  ctx.restore()
}

function splashRects(n) {
  if (n <= 0) return []
  if (n <= 4) {
    const layouts = {
      1: { w: 600, h: 850, y: 190, gap: 0 },
      2: { w: 600, h: 850, y: 190, gap: 100 },
      3: { w: 540, h: 760, y: 205, gap: 25 },
      4: { w: 445, h: 700, y: 205, gap: 20 }
    }
    const l = layouts[n]
    const rowW = n * l.w + (n - 1) * l.gap
    let x = (CANVAS_W - rowW) / 2
    return Array.from({ length: n }, () => {
      const r = { x, y: l.y, w: l.w, h: l.h, compact: false }
      x += l.w + l.gap
      return r
    })
  }

  // 双行必须像官方图一样紧密：5 首起 3+2，随后按最多列数逐级缩小。
  const topCount = Math.ceil(n / 2)
  const compact = topCount <= 3
    // 5/6 首：上排明显上提；卡框改回官方偏修长比例，并给两排留出真实间隙。
    ? { w: 360, h: 500, y: 125, pitchY: 450, gap: 28 }
    : topCount === 4
      ? { w: 330, h: 465, y: 125, pitchY: 430, gap: 18 }
      : topCount === 5
        ? { w: 300, h: 410, y: 170, pitchY: 410, gap: 12 }
        : { w: 282, h: 367, y: 195, pitchY: 370, gap: 8 }
  const rects = []
  ;[topCount, n - topCount].forEach((count, row) => {
    const rowW = count * compact.w + (count - 1) * compact.gap
    let x = (CANVAS_W - rowW) / 2
    for (let i = 0; i < count; i++) {
      rects.push({ x, y: compact.y + row * compact.pitchY, w: compact.w, h: compact.h, compact: true })
      x += compact.w + compact.gap
    }
  })
  return rects
}

function splashPlusRects(n) {
  if (n <= 0) return []
  if (n <= 5) {
    const layouts = {
      1: { w: 600, h: 840, y: 190, gap: 0 },
      2: { w: 600, h: 840, y: 190, gap: 105 },
      3: { w: 520, h: 728, y: 205, gap: 45 },
      4: { w: 430, h: 602, y: 245, gap: 34 },
      5: { w: 330, h: 462, y: 260, gap: 40 }
    }
    const l = layouts[n]
    const rowW = n * l.w + (n - 1) * l.gap
    let x = (CANVAS_W - rowW) / 2
    return Array.from({ length: n }, () => {
      const r = { x, y: l.y, w: l.w, h: l.h, compact: n >= 4 }
      x += l.w + l.gap
      return r
    })
  }

  const topCount = Math.ceil(n / 2)
  const l = topCount <= 3
    ? { w: 360, h: 504, y: 135, pitchY: 445, gap: 40 }
    : topCount === 4
      ? { w: 320, h: 448, y: 145, pitchY: 430, gap: 28 }
      : { w: 300, h: 420, y: 145, pitchY: 410, gap: 24 }
  const rects = []
  ;[topCount, n - topCount].forEach((count, row) => {
    const rowW = count * l.w + (count - 1) * l.gap
    let x = (CANVAS_W - rowW) / 2
    for (let i = 0; i < count; i++) {
      rects.push({ x, y: l.y + row * l.pitchY, w: l.w, h: l.h, compact: true })
      x += l.w + l.gap
    }
  })
  return rects
}

const SPLASH_NEW_STYLES = [
  { top: '#fff7c8', bottom: '#f5a23b', edge: '#cb701e' },
  { top: '#f4fff9', bottom: '#20bbb6', edge: '#087f79' },
  { top: '#f6fbff', bottom: '#55a9ec', edge: '#2675b9' },
  { top: '#fff4ff', bottom: '#b66de0', edge: '#7d32ae' },
  { top: '#f5ffe9', bottom: '#5acb72', edge: '#168944' },
  { top: '#fff2ef', bottom: '#ef7780', edge: '#bc4853' }
]

function splashNewMetrics(ctx, rect) {
  const size = Math.round(rect.h * 0.074)
  ctx.font = `800 ${size}px ${FONT}`
  const measured = Math.max(1, ctx.measureText('NEW!').width)
  return { size, sx: Math.min(0.92, (rect.w * 0.46) / measured), cy: rect.h * 0.052 }
}

/**
 * 官方外沿不是磨砂玻璃：卡片与 NEW! 先并成同一个轮廓，再统一加米白半透明叠层。
 * 叠层本身边缘清晰，仅它后面的黑色投影做柔化。
 */
function drawSplashUnifiedBacking(ctx, rect) {
  const { x, y, w, h, compact } = rect
  const pad = Math.ceil(Math.max(24, w * 0.075))
  const layer = document.createElement('canvas')
  layer.width = Math.ceil(w + pad * 2)
  layer.height = Math.ceil(h + pad * 2)
  const lc = layer.getContext('2d')
  lc.fillStyle = 'rgba(255, 252, 231, 0.72)'
  lc.beginPath()
  lc.roundRect(pad + w * 0.008, pad + h * 0.052, w * 0.984, h * 0.914, Math.max(10, w * 0.045))
  lc.fill()

  if (!compact) {
    const m = splashNewMetrics(lc, rect)
    lc.save()
    lc.translate(pad + w / 2, pad + m.cy)
    lc.scale(m.sx, 1)
    lc.font = `800 ${m.size}px ${FONT}`
    lc.textAlign = 'center'
    lc.textBaseline = 'middle'
    lc.lineJoin = 'round'
    lc.strokeStyle = 'rgba(255, 252, 231, 0.72)'
    lc.lineWidth = m.size * 0.24
    lc.strokeText('NEW!', 0, 0)
    lc.fillText('NEW!', 0, 0)
    lc.restore()
  }

  ctx.save()
  ctx.shadowColor = 'rgba(0, 0, 0, 0.66)'
  ctx.shadowBlur = Math.max(10, w * 0.032)
  ctx.shadowOffsetY = Math.max(6, h * 0.014)
  ctx.drawImage(layer, x - pad, y - pad)
  ctx.restore()
}

/** 透明玻璃外壳：无磨砂，少量白色叠加 + 清晰高光边缘。 */
function drawClearCardShell(ctx, x, y, w, h, radius, options = {}) {
  const fillAlpha = options.fillAlpha ?? 0.16
  const strokeAlpha = options.strokeAlpha ?? 0.62
  const strokeWidth = options.strokeWidth ?? Math.max(3, w * 0.012)
  const shadowAlpha = options.shadowAlpha ?? 0.78
  const shadowBlur = options.shadowBlur ?? Math.max(18, w * 0.052)
  const shadowDy = options.shadowDy ?? Math.max(9, h * 0.018)
  const pad = Math.ceil(Math.max(28, w * 0.12))
  const layer = document.createElement('canvas')
  layer.width = Math.ceil(w + pad * 2)
  layer.height = Math.ceil(h + pad * 2)
  const lc = layer.getContext('2d')
  const bx = pad
  const by = pad

  lc.save()
  lc.shadowColor = `rgba(7, 15, 24, ${shadowAlpha})`
  lc.shadowBlur = shadowBlur
  lc.shadowOffsetY = shadowDy
  lc.fillStyle = '#000000'
  lc.beginPath()
  lc.roundRect(bx, by, w, h, radius)
  lc.fill()
  lc.restore()

  // 把实体中心挖掉，只留下外侧投影；这样背景透过外壳时完全不偏色。
  lc.globalCompositeOperation = 'destination-out'
  lc.fillStyle = '#000000'
  lc.beginPath()
  lc.roundRect(bx, by, w, h, radius)
  lc.fill()
  lc.globalCompositeOperation = 'source-over'
  ctx.drawImage(layer, x - pad, y - pad)

  // 玻璃本身不模糊背景，只做轻微白色透叠。
  ctx.save()
  ctx.fillStyle = `rgba(255, 255, 255, ${fillAlpha})`
  ctx.strokeStyle = `rgba(255, 255, 255, ${strokeAlpha})`
  ctx.lineWidth = strokeWidth
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, radius)
  ctx.fill()
  ctx.stroke()
  ctx.restore()
}

/** UNiVERSE：比 Splash 系列窄得多的发白透明壳。 */
function drawUniverseGlassShell(ctx, x, y, w, h) {
  const edge = Math.max(5, w * 0.016)
  drawClearCardShell(ctx, x - edge, y - edge, w + edge * 2, h + edge * 2, Math.max(10, w * 0.027), {
    fillAlpha: 0.10,
    strokeAlpha: 0.58,
    strokeWidth: Math.max(2.5, w * 0.007),
    shadowAlpha: 0.72,
    shadowBlur: Math.max(14, w * 0.038),
    shadowDy: Math.max(7, h * 0.012)
  })
}

/** Splash PLUS：透明壳包住卡框，但不与任何 NEW 标签合并。 */
function drawSplashPlusBacking(ctx, rect) {
  const { x, y, w, h } = rect
  drawClearCardShell(
    ctx,
    x + w * 0.006,
    y + h * 0.049,
    w * 0.988,
    h * 0.922,
    Math.max(10, w * 0.04)
  )
}

/** NEW! 独立于卡框绘制：较轻字重、细多层描边与细条纹/方点填充。 */
function drawSplashNew(ctx, rect, style) {
  const m = splashNewMetrics(ctx, rect)
  const size = m.size
  const layer = document.createElement('canvas')
  layer.width = 520
  layer.height = 150
  const lc = layer.getContext('2d')
  lc.font = `800 ${size}px ${FONT}`
  lc.textAlign = 'center'
  lc.textBaseline = 'middle'
  lc.fillStyle = '#ffffff'
  lc.fillText('NEW!', 260, 75)
  lc.globalCompositeOperation = 'source-in'
  const fill = lc.createLinearGradient(0, 35, 0, 112)
  fill.addColorStop(0, style.top)
  fill.addColorStop(1, style.bottom)
  lc.fillStyle = fill
  lc.fillRect(0, 0, layer.width, layer.height)
  lc.globalCompositeOperation = 'source-atop'
  lc.fillStyle = 'rgba(255,255,255,0.22)'
  for (let yy = 48; yy < 112; yy += 13) lc.fillRect(75, yy, 370, 4)
  lc.fillStyle = 'rgba(70,90,95,0.12)'
  for (let xx = 104; xx < 430; xx += 29) {
    lc.fillRect(xx, 59 + ((xx / 29) % 2) * 18, 7, 7)
  }

  const cx = rect.x + rect.w / 2
  const cy = rect.y + m.cy
  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(m.sx, 1)
  ctx.font = `800 ${size}px ${FONT}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = style.edge
  ctx.lineWidth = size * 0.055
  ctx.strokeText('NEW!', 0, 0)
  ctx.drawImage(layer, -260, -75)
  ctx.restore()
}

function drawSplashCard(ctx, song, rect, template, frameIndex, options = {}) {
  const { x, y, w, h, compact } = rect
  const m = { art: { x: 0.124, y: 0.145, w: 0.754, h: 0.548 }, nameCy: 0.765, artistCy: 0.866, nameSize: 0.044, artistSize: 0.031 }
  const ax = x + w * m.art.x
  const ay = y + h * m.art.y
  const aw = w * m.art.w
  const ah = h * m.art.h

  if (options.plus) drawSplashPlusBacking(ctx, rect)
  else drawSplashUnifiedBacking(ctx, rect)
  ctx.save()
  ctx.beginPath()
  ctx.rect(ax, ay, aw, ah)
  ctx.clip()
  if (song.artImg && song.artImg.width > 1) {
    const scale = Math.max(aw / song.artImg.width, ah / song.artImg.height)
    const dw = song.artImg.width * scale
    const dh = song.artImg.height * scale
    blit(ctx, song.artImg, ax + (aw - dw) / 2, ay + (ah - dh) / 2, dw, dh)
  } else {
    ctx.fillStyle = '#edf1f3'
    ctx.fillRect(ax, ay, aw, ah)
  }
  ctx.restore()

  blit(ctx, template, x, y, w, h)
  drawBandText(ctx, song.name, x + w / 2, y + h * m.nameCy, h * m.nameSize, 900, options.plus ? '#ffe52d' : '#ffffff', w * 0.72)
  drawBandText(ctx, song.artist, x + w / 2, y + h * m.artistCy, h * m.artistSize, 700, '#ffffff', w * 0.72)
  if (!options.plus && !compact) drawSplashNew(ctx, rect, SPLASH_NEW_STYLES[frameIndex] || SPLASH_NEW_STYLES[0])
}

function renderMaiSplash(ctx, state, imgs, ver, fam) {
  const bgKey = state.splashAltBg ? 'splashAlt' : 'splash'
  const bg = imgs.maiEarlyBgs && imgs.maiEarlyBgs[bgKey]
  if (bg) blit(ctx, bg, 0, 0, CANVAS_W, CANVAS_H)
  else drawBg(ctx, ver.tint)

  drawTitle(ctx, state.title, { ...fam.title, ...ver.title })
  const logoImg = imgs.logosMai && imgs.logosMai.splash
  if (logoImg) {
    const h = fam.logo.h
    const w = h * (logoImg.width / logoImg.height)
    blit(ctx, logoImg, CANVAS_W - fam.logo.right - w, fam.logo.y, w, h)
  }

  const songs = state.songs || []
  const rects = splashRects(songs.length)
  const templateBank = imgs.maiSplashCards || {}
  songs.forEach((song, i) => {
    const r = rects[i]
    const fi = (song.frameIndex == null ? i : song.frameIndex) % MAI_PALETTES.splash.length
    const template = r && templateBank[fi]
    if (!r || !template) return
    drawSplashCard(ctx, song, r, template, fi)
  })

  if (imgs.maiSega) blitFit(ctx, imgs.maiSega, fam.sega.x, fam.sega.y, fam.sega.w, fam.sega.h)
  const credit = String(state.credit || '').trim()
  if (credit) {
    ctx.save()
    ctx.font = `600 15px ${FONT}`
    ctx.textAlign = fam.credit.align
    ctx.textBaseline = 'alphabetic'
    ctx.lineWidth = 4
    ctx.strokeStyle = '#ffffff'
    ctx.fillStyle = '#202632'
    credit.split('\n').forEach((line, i, arr) => {
      const yy = fam.credit.y - (arr.length - 1 - i) * 18
      ctx.strokeText(line, fam.credit.x, yy)
      ctx.fillText(line, fam.credit.x, yy)
    })
    ctx.restore()
  }
}

function renderMaiSplashPlus(ctx, state, imgs, ver, fam) {
  const bg = imgs.maiEarlyBgs && imgs.maiEarlyBgs.splashplus
  if (bg) blit(ctx, bg, 0, 0, CANVAS_W, CANVAS_H)
  else drawBg(ctx, ver.tint)

  drawTitle(ctx, state.title, { ...fam.title, ...ver.title })

  const logoImg = imgs.logosMai && imgs.logosMai.splashplus
  if (logoImg) {
    const h = fam.logo.h
    const w = h * (logoImg.width / logoImg.height)
    blit(ctx, logoImg, fam.logo.x, fam.logo.y, w, h)
  }
  if (imgs.maiSega) blitFit(ctx, imgs.maiSega, fam.sega.x, fam.sega.y, fam.sega.w, fam.sega.h)

  const songs = state.songs || []
  const rects = splashPlusRects(songs.length)
  const templateBank = imgs.maiSplashCards || {}
  songs.forEach((song, i) => {
    const r = rects[i]
    const fi = (song.frameIndex == null ? i : song.frameIndex) % MAI_PALETTES.splashplus.length
    const template = r && templateBank[fi]
    if (!r || !template) return
    drawSplashCard(ctx, song, r, template, fi, { plus: true })
  })

  const credit = String(state.credit || '').trim()
  if (credit) {
    ctx.save()
    ctx.font = `600 15px ${FONT}`
    ctx.textAlign = fam.credit.align
    ctx.textBaseline = 'alphabetic'
    ctx.lineWidth = 4
    ctx.strokeStyle = '#ffffff'
    ctx.fillStyle = '#202632'
    credit.split('\n').forEach((line, i, arr) => {
      const yy = fam.credit.y - (arr.length - 1 - i) * 18
      ctx.strokeText(line, fam.credit.x, yy)
      ctx.fillText(line, fam.credit.x, yy)
    })
    ctx.restore()
  }
}
function renderMaiEarly(ctx, state, imgs, ver, fam) {
  const titleCfg = { ...fam.title, ...ver.title }
  const songs = state.songs || []
  // Qwen 洗净的官方背景（头条波浪/底部装饰已烘焙）
  const bg = imgs.maiEarlyBgs && imgs.maiEarlyBgs[ver.earlyBg]
  if (bg) {
    blit(ctx, bg, 0, 0, CANVAS_W, CANVAS_H)
  } else {
    drawBg(ctx, ver.tint)
  }
  // logo：splashplus 官方图 logo 在左上（官方位置 x14 y8 h133）；splash 同位画自己的 logo
  const logoImg = imgs.logosMai && imgs.logosMai[state.version]
  if (logoImg) {
    const h = 133
    const w = h * (logoImg.width / logoImg.height)
    blit(ctx, logoImg, 14, 8, w, h)
  }
  // 标题
  drawTitle(ctx, state.title, titleCfg)
  // 卡片
  const rects = gridRects(fam, songs.length)
  const base = imgs.maiEarly && imgs.maiEarly.cardGreen
  songs.forEach((s, i) => {
    const r = rects[i]
    if (!r || !base) return
    const fi = s.frameIndex != null ? s.frameIndex : (i % EARLY_HUE.length)
    drawCard(ctx, s, r.x, r.y, r.w, r.h, getEarlyCard(base, EARLY_HUE[fi] || 0), fam)
  })
  // 徽章（官方追加图标配，单曲时不显示？官方 1 曲也有「1曲まとめて」— 保持显示）
  if (state.showBadge !== false && songs.length > 0) {
    drawEarlyBadge(ctx, imgs, songs.length)
  }
  // SEGA 右下 + 版权左下
  if (imgs.maiSega) blitFit(ctx, imgs.maiSega, fam.sega.x, fam.sega.y, fam.sega.w, fam.sega.h)
  const credit = String(state.credit || '').trim()
  if (credit) {
    ctx.save()
    ctx.font = `500 15px ${FONT}`
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = 'rgba(0,0,0,0.35)'
    ctx.shadowBlur = 3
    credit.split('\n').forEach((l, i, arr) => {
      ctx.fillText(l, fam.credit.x, fam.credit.y - (arr.length - 1 - i) * 18)
    })
    ctx.restore()
  }
}

/* ================= 早期 dx 家族（程序化重绘） ================= */

function drawCloudHeader(ctx, H) {
  // 白云带 + 扇贝圆边 + 底部淡蓝阴影
  const r = 26
  ctx.save()
  ctx.fillStyle = '#bfe4f8'
  for (let x = -r; x < CANVAS_W + r; x += r * 2 - 4) {
    ctx.beginPath()
    ctx.arc(x + r, H - r + 10, r, 0, Math.PI)
    ctx.fill()
  }
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, CANVAS_W, H - r)
  for (let x = -r; x < CANVAS_W + r; x += r * 2 - 4) {
    ctx.beginPath()
    ctx.arc(x + r, H - r, r, 0, Math.PI)
    ctx.fill()
  }
  ctx.restore()
}

function drawDxCard(ctx, song, x, y, w, h, fam, template, compactBadge = false, clearShell = false, badgeVariant = 'classic') {
  const c = fam.card
  const frameIndex = (song.frameIndex == null ? 0 : song.frameIndex) % MAI_PALETTES.earlyDx.length
  const hue = [0, 49, -106, 136, 77, -164][frameIndex]
  const scale = w / 390

  // 2022 采用与 Splash PLUS 相同的无色透明外壳；其他 DX 版本保留原卡框投影。
  if (clearShell) {
    drawClearCardShell(ctx, x - w * 0.018, y - h * 0.014, w * 1.036, h * 1.034, 25 * scale)
  } else {
    ctx.save()
    ctx.shadowColor = c.shadow.color
    ctx.shadowBlur = c.shadow.blur * scale
    ctx.shadowOffsetY = c.shadow.dy * scale
    ctx.fillStyle = 'rgba(0, 80, 105, .45)'
    ctx.beginPath()
    ctx.roundRect(x + w * 0.02, y + h * 0.02, w * 0.96, h * 0.95, 24 * scale)
    ctx.fill()
    ctx.restore()
  }

  // 曲绘
  const ax = x + w * c.art.x
  const ay = y + h * c.art.y
  const aw = w * c.art.w
  const ah = h * c.art.h
  ctx.save()
  ctx.beginPath()
  ctx.rect(ax, ay, aw, ah)
  ctx.clip()
  if (song.artImg && song.artImg.width > 1) {
    const img = song.artImg
    const scale = Math.max(aw / img.width, ah / img.height)
    const dw = img.width * scale
    const dh = img.height * scale
    blit(ctx, img, ax + (aw - dw) / 2, ay + (ah - dh) / 2, dw, dh)
  } else {
    ctx.fillStyle = '#eef2f3'
    ctx.fillRect(ax, ay, aw, ah)
  }
  ctx.restore()

  if (template) {
    ctx.save()
    ctx.filter = `hue-rotate(${hue}deg)`
    blit(ctx, template, x, y, w, h)
    ctx.restore()
  }

  // 模板上的虚线在缩小时仍保持清晰。
  ctx.save()
  ctx.setLineDash([6 * scale, 5 * scale])
  ctx.strokeStyle = 'rgba(255,255,255,.22)'
  ctx.lineWidth = 1.5 * scale
  ctx.beginPath()
  ctx.moveTo(x + w * 0.13, y + h * 0.878)
  ctx.lineTo(x + w * 0.87, y + h * 0.878)
  ctx.stroke()
  ctx.restore()

  // 曲名/署名
  drawBandText(ctx, song.name, x + w / 2, y + h * c.name.cy, h * c.name.size, c.name.weight, c.name.color, w * 0.72)
  drawBandText(ctx, song.artist, x + w / 2, y + h * c.artist.cy, h * c.artist.size, c.artist.weight, c.artist.color, w * 0.72)

  const badgeX = x + w / 2
  const badgeY = y - (compactBadge ? 28 : 40) * scale
  if (badgeVariant === '2021') drawDx2021NewBadge(ctx, badgeX, badgeY, scale)
  else drawDxNewBadge(ctx, badgeX, badgeY, scale)
}

function drawDxNewBadge(ctx, cx, cy, scale) {
  ctx.save()
  const em = 48 * scale
  const baseline = cy + 2 * scale
  ctx.font = `900 ${em}px 'FOT-NewRodin Pro', ${FONT}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.lineJoin = 'round'
  ctx.miterLimit = 2

  // 原版不是白色底板，而是紧贴字形的多层轮廓：灰影 → 白边 → 深橙边 → 渐变字面。
  ctx.save()
  ctx.translate(1.5 * scale, 8 * scale)
  ctx.strokeStyle = '#39747d'
  ctx.lineWidth = 20 * scale
  ctx.strokeText('NEW', cx, baseline)
  ctx.restore()

  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 17 * scale
  ctx.strokeText('NEW', cx, baseline)
  ctx.strokeStyle = '#d94b00'
  ctx.lineWidth = 9 * scale
  ctx.strokeText('NEW', cx, baseline)

  const grad = ctx.createLinearGradient(0, cy - em * 0.48, 0, cy + em * 0.48)
  grad.addColorStop(0, '#ffffff')
  grad.addColorStop(0.42, '#ffffff')
  grad.addColorStop(0.5, '#fff8c4')
  grad.addColorStop(0.64, '#fff04a')
  grad.addColorStop(0.86, '#ffd21f')
  grad.addColorStop(1, '#ffc018')
  ctx.fillStyle = grad
  ctx.fillText('NEW', cx, baseline)

  // 字面顶端的细白高光，保留早期公告图的塑料贴纸质感。
  ctx.globalAlpha = 0.55
  ctx.strokeStyle = '#fff7d5'
  ctx.lineWidth = 1.5 * scale
  ctx.strokeText('NEW', cx, baseline - 1 * scale)
  ctx.restore()
}

/** 国服 FESTiVAL（舞萌DX 2023）卡片顶端的独立 NEW! 贴字。仅单行版式显示。 */
function drawFestivalCnNewBadge(ctx, cx, cy, scale) {
  const em = 58 * scale
  ctx.save()
  ctx.font = `900 ${em}px 'FOT-NewRodin Pro', ${FONT}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.lineJoin = 'round'
  ctx.miterLimit = 2

  // 国服 2023 没有描边：字面外是高亮、厚重但半径不大的黄色发光。
  ctx.shadowColor = 'rgba(255, 239, 0, 1)'
  ctx.shadowBlur = 12 * scale
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0

  const grad = ctx.createLinearGradient(0, cy - em * 0.48, 0, cy + em * 0.48)
  grad.addColorStop(0, '#f47700')
  grad.addColorStop(0.38, '#ff9215')
  grad.addColorStop(0.72, '#ffb34c')
  grad.addColorStop(1, '#ffd09a')
  ctx.fillStyle = grad
  // 重复叠四次短半径阴影，形成参考图中浓而亮的黄色光晕，不借助 stroke 描边。
  for (let i = 0; i < 4; i++) ctx.fillText('NEW!', cx, cy)
  // 最后覆盖一次无阴影字面，保持渐变笔画清晰。
  ctx.shadowColor = 'transparent'
  ctx.fillText('NEW!', cx, cy)
  ctx.restore()
}

/** 国服 2021：四个纯色字符组合后统一加白边，再叠一份向下错位的蓝灰阴影。 */
function drawDx2021NewBadge(ctx, cx, cy, scale) {
  const chars = [
    { text: 'N', color: '#ef6658' },
    { text: 'E', color: '#24a9dc' },
    { text: 'W', color: '#f3cf22' },
    { text: '!', color: '#69b94b' }
  ]
  const em = 45 * scale
  const family = `'FOT-NewRodin Pro', ${FONT}`
  ctx.save()
  ctx.font = `900 ${em}px ${family}`
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.lineJoin = 'round'
  ctx.miterLimit = 2
  // 原版四个字几乎贴在一起；按字符单独排版，避免 Canvas 默认字距把标识拉松。
  const widths = chars.map(({ text }) => ctx.measureText(text).width - 3.2 * scale)
  const total = widths.reduce((sum, width) => sum + width, 0)
  const left = cx - total / 2

  // 每个字符在紧字距坐标上绘制同一套阴影/白边；相邻描边自然并合成整组轮廓。
  let x = left
  ctx.fillStyle = '#397f91'
  ctx.strokeStyle = '#397f91'
  ctx.lineWidth = 11 * scale
  chars.forEach(({ text }, i) => {
    ctx.strokeText(text, x + 1.5 * scale, cy + 6 * scale)
    ctx.fillText(text, x + 1.5 * scale, cy + 6 * scale)
    x += widths[i]
  })
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 9 * scale
  x = left
  chars.forEach(({ text }, i) => {
    ctx.strokeText(text, x, cy)
    x += widths[i]
  })

  // 用同色细描边增厚字面，保持纯色填充，不引入渐变。
  x = left
  chars.forEach(({ text, color }, i) => {
    ctx.strokeStyle = color
    ctx.lineWidth = 2.6 * scale
    ctx.strokeText(text, x, cy)
    ctx.fillStyle = color
    ctx.fillText(text, x, cy)
    x += widths[i]
  })
  ctx.restore()
}

/** DX / DX PLUS / 国服初代 / 2021 共用的公告标题。 */
function drawDxTitle(ctx, text, cfg) {
  drawTitle(ctx, String(text || ' ').replace(/\n+/g, ' '), cfg)
}

/** 舞萌DX 2022 公告标题：黄色字面、深蓝双描边、白边与最外层薄荷绿轮廓。 */
function drawDx2022Title(ctx, text) {
  drawTitle(ctx, String(text || ' ').replace(/\n+/g, ' '), {
    ...DX2022_TITLE_STYLE,
    baseline: 135,
    centerX: CANVAS_W / 2,
    maxW: 820
  })
}

function dxVariantRects(fam, n, variant) {
  if (variant === 'cn2021' && n >= 5) {
    const fiveSongLayout = n === 5
    const w = fiveSongLayout ? 320 : 280
    const h = w * fam.card.ratio
    const gap = fiveSongLayout ? 55 : 20
    const rows = [Math.ceil(n / 2), Math.floor(n / 2)]
    const top = fiveSongLayout ? 220 : 230
    const rowPitch = fiveSongLayout ? 425 : 360
    const out = []
    rows.forEach((count, row) => {
      const rowW = count * w + (count - 1) * gap
      let x = (CANVAS_W - rowW) / 2
      for (let i = 0; i < count; i++) {
        out.push({ x, y: top + row * rowPitch, w, h })
        x += w + gap
      }
    })
    return out
  }
  if (variant === 'cn2022') {
    if (n > 0 && n <= 4) {
      const w = 390
      const h = w * fam.card.ratio
      const gap = 45
      const rowW = n * w + (n - 1) * gap
      return Array.from({ length: n }, (_, i) => ({ x: (CANVAS_W - rowW) / 2 + i * (w + gap), y: 345, w, h }))
    }
    if (n >= 5) {
      const w = 305
      const h = w * fam.card.ratio
      const gap = 70
      const rows = [Math.ceil(n / 2), Math.floor(n / 2)]
      const out = []
      rows.forEach((count, row) => {
        const rowW = count * w + (count - 1) * gap
        let x = (CANVAS_W - rowW) / 2
        for (let i = 0; i < count; i++) {
          out.push({ x, y: 220 + row * 405, w, h })
          x += w + gap
        }
      })
      return out
    }
  }
  return gridRects(fam, n)
}

function renderMaiEarlyDx(ctx, state, imgs, ver, fam) {
  const titleCfg = { ...fam.title, ...ver.title }
  const songs = state.songs || []
  const bg = imgs.maiEarlyBgs && imgs.maiEarlyBgs[ver.earlyBg]
  if (bg) {
    blit(ctx, bg, 0, 0, CANVAS_W, CANVAS_H)
  } else {
    drawBg(ctx, ver.tint)
    drawCloudHeader(ctx, 176)
  }
  // 2022 的版本 logo / SEGA / 标题都有独立位置；其余版本沿用右上 logo 与左下 SEGA。
  const logoKey = state.dxLogoVariant === 'plus' ? 'plus' : 'deradx'
  const cnLogoMap = { cn: imgs.maiCnDxLogo, cn2021: imgs.maiCn2021Logo, cn2022: imgs.maiCn2022Logo }
  const logoImg = cnLogoMap[state.dxLogoVariant] || (imgs.logosMai && imgs.logosMai[logoKey])
  if (logoImg) {
    if (state.dxLogoVariant === 'cn') {
      // 用户提供的 PNG 是 973×295，但有效图形仅位于 (230,6)–(742,289)。
      // 按有效边界绘制，避免透明留白让国服 logo 看起来虚小且离右侧过远。
      const source = { x: 230, y: 6, w: 513, h: 284 }
      const h = 154
      const w = h * source.w / source.h
      ctx.drawImage(logoImg, source.x, source.y, source.w, source.h, CANVAS_W - 28 - w, 7, w, h)
    } else if (state.dxLogoVariant === 'cn2021') {
      const h = 195
      const w = h * logoImg.width / logoImg.height
      blit(ctx, logoImg, CANVAS_W - 20 - w, 0, w, h)
    } else if (state.dxLogoVariant === 'cn2022') {
      const h = 142
      const w = h * logoImg.width / logoImg.height
      blit(ctx, logoImg, 42, 14, w, h)
    } else {
      const h = 140
      const w = h * (logoImg.width / logoImg.height)
      blit(ctx, logoImg, CANVAS_W - 28 - w, 9, w, h)
    }
  }
  if (state.dxLogoVariant === 'cn2022') drawDx2022Title(ctx, state.title)
  else drawDxTitle(ctx, state.title, titleCfg)
  const rects = dxVariantRects(fam, songs.length, state.dxLogoVariant)
  const twoRows = state.dxLogoVariant === 'cn2021'
    ? songs.length >= 5
    : state.dxLogoVariant === 'cn2022'
      ? songs.length >= 5
      : songs.length >= 6
  songs.forEach((s, i) => {
    const r = rects[i]
    if (r) drawDxCard(
      ctx, s, r.x, r.y, r.w, r.h, fam,
      imgs.maiEarly && imgs.maiEarly.cardDxGreen,
      twoRows,
      state.dxLogoVariant === 'cn2022',
      state.dxLogoVariant === 'cn2021' ? '2021' : 'classic'
    )
  })
  // SEGA + 版权
  if (imgs.maiSega) {
    if (state.dxLogoVariant === 'cn2022') blitFit(ctx, imgs.maiSega, 1740, 20, 150, 50)
    else blitFit(ctx, imgs.maiSega, fam.sega.x, fam.sega.y, fam.sega.w, fam.sega.h)
  }
  const credit = String(state.credit || '').trim()
  if (credit) {
    ctx.save()
    ctx.font = `500 15px ${FONT}`
    ctx.textAlign = 'right'
    ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = 'rgba(0,0,0,0.35)'
    ctx.shadowBlur = 3
    credit.split('\n').forEach((l, i, arr) => {
      ctx.fillText(l, fam.credit.x, fam.credit.y - (arr.length - 1 - i) * 18)
    })
    ctx.restore()
  }
}

/* ================= MAGiCAL（PSD 单卡版式） ================= */

/** 逐字绘制（支持 PS 字距 tracking px/字 + 横向压缩 scaleX），返回总宽 */
function drawTracked(ctx, text, cx, baseline, em, weight, family, tracking, fillFn, strokeSpec, scaleX = 1) {
  const f = `${weight} ${em}px ${family}, 'UDShinGo SC', 'Noto Sans JP', 'Noto Sans SC', sans-serif`
  ctx.save()
  ctx.font = f
  ctx.textBaseline = 'alphabetic'
  ctx.lineJoin = 'round'
  ctx.miterLimit = 2
  const widths = [...text].map((ch) => ctx.measureText(ch).width)
  const natural = widths.reduce((a, b) => a + b, 0) + tracking * Math.max(0, widths.length - 1)
  let x = cx - (natural * scaleX) / 2
  const positions = []
  widths.forEach((width) => { positions.push(x); x += (width + tracking) * scaleX })
  const each = (fn) => {
    ;[...text].forEach((ch, i) => {
      ctx.save()
      ctx.translate(positions[i], 0)
      ctx.scale(scaleX, 1)
      fn(ch)
      ctx.restore()
    })
  }
  // 整体描边：每一层先覆盖所有字，再统一填充（避免逐字描边互相遮挡）
  if (strokeSpec) {
    for (const st of strokeSpec) {
      ctx.strokeStyle = st.color
      ctx.lineWidth = st.w
      each((ch) => ctx.strokeText(ch, 0, baseline))
    }
  }
  ctx.fillStyle = typeof fillFn === 'function' ? fillFn(baseline) : fillFn
  each((ch) => ctx.fillText(ch, 0, baseline))
  ctx.restore()
  return natural * scaleX
}

/** 卡内文字：单行放不下先缩字号，仍放不下自动换行（拉丁优先断空格），最多 maxLines 行 */
function wrapCardText(ctx, text, maxW, size, weight, family, tracking) {
  ctx.font = `${weight} ${size}px ${family}, 'UDShinGo SC', 'Noto Sans JP', 'Noto Sans SC', sans-serif`
  const width = (t) => ctx.measureText(t).width + tracking * Math.max(0, [...t].length - 1)
  const lines = []
  let cur = ''
  for (const ch of text) {
    if (ch === '\n') { lines.push(cur); cur = ''; continue }
    const t = cur + ch
    if (width(t) <= maxW || !cur) { cur = t; continue }
    // 拉丁词尽量断在空格
    if (/[A-Za-z0-9]/.test(ch) && /[A-Za-z0-9]/.test(cur.slice(-1))) {
      const sp = cur.lastIndexOf(' ')
      if (sp > 0 && width(cur.slice(0, sp)) > 0) { lines.push(cur.slice(0, sp)); cur = cur.slice(sp + 1) + ch; continue }
    }
    lines.push(cur); cur = ch
  }
  if (cur) lines.push(cur)
  return lines
}

function drawCardText(ctx, text, cx, cy, cardW, o) {
  text = String(text || '')
  const family = `${o.family}, 'UDShinGo SC', 'Noto Sans JP', 'Noto Sans SC', sans-serif`
  const maxW = cardW * 0.88
  const measured = (t, sz) => {
    ctx.font = `${o.weight} ${sz}px ${family}`
    return ctx.measureText(t).width + o.tracking * cardW * Math.max(0, [...t].length - 1)
  }
  // 1) 单行: sizeSingle 往下缩
  let size = o.sizeSingle * cardW
  while (measured(text, size) > maxW && size > o.min * cardW) size -= 1
  let lines = [text]
  // 2) 单行到下限仍放不下 → 换行（multi 字号起缩）
  if (measured(text, size) > maxW) {
    size = o.size * cardW
    lines = wrapCardText(ctx, text, maxW, size, o.weight, family, o.tracking * cardW)
    while (lines.length > o.maxLines && size > o.min * cardW) {
      size -= 1
      lines = wrapCardText(ctx, text, maxW, size, o.weight, family, o.tracking * cardW)
    }
    lines = lines.slice(0, o.maxLines)
  }
  ctx.save()
  ctx.font = `${o.weight} ${size}px ${family}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = o.color
  const lh = size * 1.25
  const startY = cy - ((lines.length - 1) * lh) / 2
  lines.forEach((l, i) => {
    const t = l
    const tw = ctx.measureText(t).width + o.tracking * cardW * Math.max(0, [...t].length - 1)
    let x = cx - tw / 2
    ;[...t].forEach((ch) => {
      ctx.fillText(ch, x + ctx.measureText(ch).width / 2, startY + i * lh)
      x += ctx.measureText(ch).width + o.tracking * cardW
    })
  })
  ctx.restore()
}

/** MAGiCAL 布局：≤4 单行大卡（带徽章）；≥5 双行小卡（上行 ceil） */
function magicalRects(fam, n, offsetY = 0) {
  const c = fam.card
  const g = fam.grid
  const out = []
  if (n <= 0) return out
  if (n <= 4) {
    const contentW = 1836
    let w = c.w, gap = g.gap
    const need = n * w + (n - 1) * gap
    if (need > contentW) {
      const k = contentW / need
      w *= k; gap *= k
    }
    const h = w * (c.h / c.w)
    const rowW = n * w + (n - 1) * gap
    let x = (CANVAS_W - rowW) / 2
    for (let i = 0; i < n; i++) {
      out.push({ x, y: c.top + offsetY, w, h })
      x += w + gap
    }
    return out
  }
  const topCount = Math.ceil(n / 2)
  const rows = [topCount, n - topCount]
  rows.forEach((count, ri) => {
    const y = (ri === 0 ? g.rows.top : g.rows.top + g.rows.rowPitch) + offsetY
    const rowW = count * g.rows.cardW + (count - 1) * (g.rows.cardW * 0.13)
    let x = (CANVAS_W - rowW) / 2
    for (let i = 0; i < count; i++) {
      out.push({ x, y, w: g.rows.cardW, h: g.rows.cardH })
      x += g.rows.cardW * 1.13
    }
  })
  return out
}



function renderMaiMagical(ctx, state, imgs, ver, fam) {
  const songs = state.songs || []
  // PSD 家族素材库：magical / circle / circleplus / festival～prismplus 各一套 bg(+header)
  const bank = (imgs.maiPsd && imgs.maiPsd[ver.psdAssets || fam.assets || 'magical']) || imgs.maiMagical || {}
  // 白底 → bg(RGBA 含半透明) → header(RGBA 含半透明阴影/出框元素)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
  if (bank.bg) blit(ctx, bank.bg, 0, 0, CANVAS_W, CANVAS_H)
  else drawBg(ctx, ver.tint)
  const hr = fam.headerRect
  const headerImg = ver.headerCnSwap && state.useCnLogo && bank.headerCn ? bank.headerCn : bank.header
  if (headerImg && hr) {
    blit(ctx, headerImg, hr.x, hr.y, hr.w, hr.h)
  } else if (ver.band) {
    // 过渡态：用户自制 header 就位前，仍用旧横幅 + 版本 logo + SEGA
    const bandImg = imgs.maiBands && imgs.maiBands[ver.band]
    if (bandImg) blit(ctx, bandImg, 0, 0, CANVAS_W, fam.bandH)
    const festivalVariant = state.festivalLogoVariant || 'jp'
    const logoImg = ver.festivalLogoSelector
      ? (festivalVariant === 'plus'
          ? imgs.logosMai?.festivalplus
          : festivalVariant === 'cn2023'
            ? imgs.maiCn2023Logo
            : imgs.logosMai?.festival)
      : imgs.logosMai && imgs.logosMai[state.version]
    if (logoImg) {
      const lr = (ver.festivalLogoSelector && festivalVariant === 'cn2023' && ver.cnLogoRect) || ver.logoRect || fam.logo
      const w = lr.w || (lr.h * logoImg.width) / logoImg.height
      const h = lr.h || (lr.w * logoImg.height) / logoImg.width
      blit(ctx, logoImg, lr.x, lr.y, w, h)
    }
    if (imgs.maiSega && fam.sega) blitFit(ctx, imgs.maiSega, fam.sega.x, fam.sega.y, fam.sega.w, fam.sega.h)
  }
  const t = { ...fam.title, ...ver.title }
  const gradient = (baseline) => {
    const g = ctx.createLinearGradient(0, baseline - t.em * 0.85, 0, baseline)
    for (const [pos, col] of t.fill) g.addColorStop(pos, col)
    return g
  }
  if (t.shadowColorSolid) {
    // 错位纯色「阴影」= 文字+外圈轮廓的实色副本下移（PSD 投影: 100% 不透明）
    const sw = (t.strokes && t.strokes[0] ? t.strokes[0].w : 46.9)
    drawTracked(ctx, state.title || '', t.center, t.baseline + t.shadowDy, t.em, t.weight, t.family, t.tracking,
      t.shadowColorSolid, [{ color: t.shadowColorSolid, w: sw }], t.scaleX || 1)
  }
  drawTracked(ctx, state.title || '', t.center, t.baseline, t.em, t.weight, t.family, t.tracking,
    gradient, t.strokes, t.scaleX || 1)

  const c = fam.card
  // 徽章只在单行版式（≤4 首）出现；关掉徽章后上方会空一块，卡片整体上移补位
  const badgeImg = bank.badge || (imgs.maiMagical && imgs.maiMagical.badge)
  const oneRow = songs.length > 0 && songs.length <= 4
  const festivalCn2023 = ver.festivalLogoSelector && state.festivalLogoVariant === 'cn2023'
  const badgeShown = !festivalCn2023 && state.showBadge !== false && oneRow && !!badgeImg
  const badgeLift = !badgeShown && !festivalCn2023 && oneRow ? (ver.badgeLift ?? fam.badgeLift ?? 0) : 0
  const rects = magicalRects(fam, songs.length, (ver.cardOffsetY || 0) - badgeLift)
  const cardBank = imgs.maiMagicalCards || {}
  songs.forEach((song, i) => {
    const r = rects[i]
    if (!r) return
    const scale = r.w / c.w
    const fi = song.frameIndex != null ? song.frameIndex : 0
    const cardImg = cardBank[MAI_MAGICAL_CARD_KEYS[fi] || 'cardGreen'] || cardBank.cardGreen
    // 白描边 6px(2048) 外扩 + 投影（PSD：黑 46%、Dstn 8、blur 13、Ckmt 28）
    const ring = 6 * 0.9375
    ctx.save()
    ctx.shadowColor = 'rgba(0, 0, 0, 0.46)'
    ctx.shadowBlur = 13 * scale
    ctx.shadowOffsetY = 8 * scale
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.roundRect(r.x - ring * scale, r.y - ring * scale, r.w + 2 * ring * scale, r.h + 2 * ring * scale, 14 * scale)
    ctx.fill()
    ctx.restore()
    // 曲绘
    const ax = r.x + c.art.x * scale
    const ay = r.y + c.art.y * scale
    const aw = c.art.w * scale
    const ah = c.art.h * scale
    ctx.save()
    ctx.beginPath()
    ctx.rect(ax, ay, aw, ah)
    ctx.clip()
    if (song.artImg && song.artImg.width > 1) {
      const img = song.artImg
      const sc = Math.max(aw / img.width, ah / img.height)
      const dw = img.width * sc
      const dh = img.height * sc
      blit(ctx, img, ax + (aw - dw) / 2, ay + (ah - dh) / 2, dw, dh)
    } else {
      ctx.fillStyle = '#3a3a44'
      ctx.fillRect(ax, ay, aw, ah)
    }
    ctx.restore()
    // 官方框模板（含像素装饰）
    blit(ctx, cardImg, r.x, r.y, r.w, r.h)
    // 曲名/署名（卡内水平居中，自动缩字号+换行）
    drawCardText(ctx, song.name || '', r.x + r.w / 2, r.y + c.name.cy * r.h, r.w, c.name)
    drawCardText(ctx, song.artist || '', r.x + r.w / 2, r.y + c.artist.cy * r.h, r.w, c.artist)
  })
  if (festivalCn2023 && oneRow) {
    rects.forEach((r) => drawFestivalCnNewBadge(ctx, r.x + r.w / 2, r.y - 22 * (r.w / c.w), r.w / c.w))
  }
  // 横幅下沿垂下来的装饰云：原版层级在卡片之上，单独一层盖上去
  if (ver.decoRect && bank.deco) {
    const dr = ver.decoRect
    blit(ctx, bank.deco, dr.x, dr.y, dr.w, dr.h)
  }
  // 版本 logo（左上）/ SEGA（右上）：背景素材里已擦除，这里补画
  if (ver.topLogos) {
    const cnLogoImg = imgs[ver.cnLogoKey || 'maiCnLogo']
    const useCn = ver.cnLogo && state.useCnLogo && cnLogoImg
    const logoImg = useCn || (imgs.logosMai && imgs.logosMai[state.version])
    if (logoImg) {
      const lr = (useCn && ver.cnLogoRect) || ver.logoRect || fam.logo
      const w = lr.w || (lr.h * logoImg.width) / logoImg.height
      const h = lr.w ? (w * logoImg.height) / logoImg.width : lr.h
      blit(ctx, logoImg, lr.x, lr.y, w, h)
    }
    const sr = ver.segaRect || fam.sega
    if (imgs.maiSega && sr) blitFit(ctx, imgs.maiSega, sr.x, sr.y, sr.w, sr.h)
  }
  // CiRCLE 顶栏自身已含日服 logo/SEGA；切换国服时改用清洁顶栏，只补画 2027 logo。
  if (ver.headerCnSwap && state.useCnLogo) {
    const logoImg = imgs[ver.cnLogoKey]
    const lr = ver.cnLogoRect
    if (logoImg && lr) {
      const h = lr.w * logoImg.height / logoImg.width
      const outline = ver.cnLogoOutline
      if (outline) blitOutlined(ctx, logoImg, lr.x, lr.y, lr.w, h, outline.color, outline.width)
      else blit(ctx, logoImg, lr.x, lr.y, lr.w, h)
    }
  }
  // 新曲标签：仅一行版式（≤4 首）
  if (badgeShown) {
    const b = fam.badge
    const h = b.w * (badgeImg.height / badgeImg.width)
    blit(ctx, badgeImg, b.x, b.y, b.w, h)
  }
  // 底部版权行：官方为右下角深灰黑小字
  drawMaiCredit(ctx, state.credit)
}
/** 舞萌公告图版权：深灰黑小字、右下角（官方公告图实测：右缘 x≈1902、基线 y≈1064，色 #272727） */
function drawMaiCredit(ctx, credit) {
  const text = String(credit || '').trim()
  if (!text) return
  ctx.save()
  ctx.font = `500 13px ${FONT}`
  ctx.textAlign = 'right'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#272727'
  const lines = text.split('\n')
  lines.forEach((l, i) => {
    ctx.fillText(l, 1902, 1064 - (lines.length - 1 - i) * 16)
  })
  ctx.restore()
}

/* ================= 主渲染 ================= */
/** 当前版本的主背景是否已就位（舞萌素材按需加载，首帧可能先于图片到达） */
function maiBgReady(ver, fam, imgs) {
  if (ver.family === 'splash' || ver.family === 'splashplus' || ver.family === 'earlySplash' || ver.family === 'earlyDx') {
    return !!(imgs.maiEarlyBgs && imgs.maiEarlyBgs[ver.earlyBg])
  }
  if (fam && fam.psd) {
    const bank = imgs.maiPsd && imgs.maiPsd[ver.psdAssets || fam.assets || 'magical']
    return !!(bank && bank.bg)
  }
  if (ver.family === 'universe') {
    return !!(imgs.maiPsd && imgs.maiPsd.universe && imgs.maiPsd.universe.bg)
  }
  return !!(imgs.maiModernBgs && imgs.maiModernBgs[ver.bg])
}

export function renderMai(ctx, state, imgs) {
  const ver = MAI_VERSIONS[state.version] || MAI_VERSIONS.festival
  const fam = FAMILIES[ver.family]
  // 主背景没到就出占位帧：首帧不等素材，但不能拿着 undefined 去量尺寸/贴图
  if (!maiBgReady(ver, fam, imgs)) {
    drawLoadingFrame(ctx)
    return
  }
  if (ver.family === 'earlySplash') {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
    renderMaiEarly(ctx, state, imgs, ver, fam)
    return
  }
  if (ver.family === 'splash') {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
    renderMaiSplash(ctx, state, imgs, ver, fam)
    return
  }
  if (ver.family === 'splashplus') {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
    renderMaiSplashPlus(ctx, state, imgs, ver, fam)
    return
  }
  if (ver.family === 'earlyDx') {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
    renderMaiEarlyDx(ctx, state, imgs, ver, fam)
    return
  }
  if (fam.psd) {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
    renderMaiMagical(ctx, state, imgs, ver, fam)
    return
  }
  const titleCfg = { ...fam.title, ...ver.title }
  if (titleCfg.emBig && /登場/.test(state.title || '')) {
    // 「新バージョン登場」启动网格用大字号，「楽曲追加」用小字号（官方两种版式）
    titleCfg.em = titleCfg.emBig
    titleCfg.baseline = titleCfg.baselineBig
    titleCfg.scaleX = titleCfg.scaleBigX
  }
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)

  // 背景（Qwen 占位背景 → 没有再退回渐变）
  const modernBg = ver.family === 'universe'
    ? imgs.maiPsd && imgs.maiPsd.universe && imgs.maiPsd.universe.bg
    : imgs.maiModernBgs && imgs.maiModernBgs[ver.bg]
  if (modernBg) {
    blit(ctx, modernBg, 0, 0, CANVAS_W, CANVAS_H)
  } else {
    drawBg(ctx, ver.tint)
  }

  // 横幅（UNiVERSE 顶栏已经烘焙在完整背景里，不再额外叠程序化棋盘）。
  const bandImg = imgs.maiBands && imgs.maiBands[ver.band || 'festival']
  if (ver.family !== 'universe' && bandImg) {
    blit(ctx, bandImg, 0, 0, CANVAS_W, fam.bandH)
  }

  // 版本 logo 左上 / SEGA 右上
  const logoKey = ver.family === 'universe' && state.universeLogoVariant === 'plus' ? 'universeplus' : state.version
  const logoImg = imgs.logosMai && imgs.logosMai[logoKey]
  if (logoImg) {
    const lr = ver.logoRect || fam.logo
    const h = lr.h
    const w = h * (logoImg.width / logoImg.height)
    blit(ctx, logoImg, lr.x, lr.y, w, h)
  }
  if (imgs.maiSega) blitFit(ctx, imgs.maiSega, fam.sega.x, fam.sega.y, fam.sega.w, fam.sega.h)

  // 标题
  drawTitle(ctx, state.title, titleCfg)

  // 卡片网格
  const songs = state.songs || []
  const rects = gridRects(fam, songs.length)
  const bankRaw = imgs.maiUnivCards || []
  const bank = Array.isArray(bankRaw) ? bankRaw : Object.keys(bankRaw).sort((a, b) => a - b).map((k) => bankRaw[k])
  const universeBank = imgs.maiMagicalCards || {}
  songs.forEach((s, i) => {
    const r = rects[i]
    if (!r) return
    if (ver.family === 'universe') {
      const fi = s.frameIndex != null ? s.frameIndex : (i % MAI_MAGICAL_CARD_KEYS.length)
      const cardImg = universeBank[MAI_MAGICAL_CARD_KEYS[fi] || 'cardGreen'] || universeBank.cardGreen
      if (cardImg) drawUniverseCard(ctx, s, r.x, r.y, r.w, r.h, cardImg, fam)
    } else {
      const fi = s.frameIndex != null ? s.frameIndex : (i % bank.length)
      const cardImg = bank[fi] || bank[0]
      if (cardImg) drawCard(ctx, s, r.x, r.y, r.w, r.h, cardImg, fam)
    }
  })

  // NEW! 徽章（单行布局时，官方追加图标配）
  if (ver.family !== 'universe' && state.showBadge !== false && songs.length > 0 && songs.length <= 5 && imgs.maiBadge) {
    const b = fam.badge
    const h = b.w * (imgs.maiBadge.height / imgs.maiBadge.width)
    blit(ctx, imgs.maiBadge, b.cx - b.w / 2, b.top, b.w, h)
  }

  // 底部版权行：官方为右下角深灰黑小字
  drawMaiCredit(ctx, state.credit)
}

