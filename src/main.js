import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// 字体：Fontsource 本地化（不请求 Google），供渲染器与界面共用
import '@fontsource/noto-sans-sc/400.css'
import '@fontsource/noto-sans-sc/700.css'
import '@fontsource/noto-sans-sc/900.css'
import '@fontsource/noto-sans-jp/400.css'
import '@fontsource/noto-sans-jp/700.css'
import '@fontsource/m-plus-rounded-1c/700.css'
import '@fontsource/m-plus-rounded-1c/800.css'
import '@fontsource/m-plus-rounded-1c/900.css'

createApp(App).mount('#app')
