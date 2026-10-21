# Otogame Update Announcement Generator

一个在浏览器本地运行的音游更新公告图生成器，目前支持多种 **maimai でらっくす** 与 **CHUNITHM** 主题。

## 功能

- 在 maimai / CHUNITHM 主题之间切换
- 添加曲名、艺术家与本地曲绘
- 支持部分国服 Logo 与不同版本变体
- 1920×1080 实时预览
- 以 2× 分辨率导出 PNG
- 曲绘只在本地浏览器内处理，不会上传到服务器

## 本地运行

需要 Node.js 20.19+ 或 22.12+。

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 项目结构

```text
src/views/UpdateGenView.vue   生成器界面、素材预加载与导出
src/utils/update-gen/         maimai / CHUNITHM Canvas 渲染器
src/assets/update-gen/        背景、卡框、Logo 与字体素材
public/chart-theme/           旧框 CHUNITHM 版本 Logo
```

## 声明

本项目为非官方同人用途工具。游戏名称、Logo 与相关素材的权利归各自权利方所有，请勿用于商业用途。
