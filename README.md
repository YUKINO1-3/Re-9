# Resident Evil Requiem Archive

一个以《生化危机：安魂曲》（Resident Evil Requiem）为主题的非官方中文资料站，集中整理主要人物、人物经历、剧情背景与完整章节档案。

项目采用 React 和 Vite 构建，以机密案件档案为视觉主题，支持桌面端与移动端访问。

> 本项目为非官方网站，与 CAPCOM 无隶属或合作关系。人物与剧情资料根据公开内容整理，相关角色、作品名称及素材版权归原权利方所有。部分页面包含完整剧情剧透。

## 在线访问

[https://yukino1-3.github.io/Re-9/](https://yukino1-3.github.io/Re-9/)

## 主要功能

- 档案风格首页与动态 Hero 背景
- Grace Ashcroft、Leon S. Kennedy 等六名主要人物档案
- 独立人物详情页，展示年龄、身份、生平、能力及关键经历
- 剧情时间线与五个完整章节页面
- 人物及章节的上一页、下一页导航
- 基于 URL Hash 的前端页面切换，可直接访问指定档案
- 页面常驻背景音乐播放器及音量记忆
- 桌面端、平板和移动端响应式布局
- GitHub Actions 自动构建并部署至 GitHub Pages

## 页面导航

项目使用 Hash 路由，不依赖额外的路由库：

| 页面 | 地址示例 |
| --- | --- |
| 首页 | `#home` |
| 角色目录 | `#characters` |
| 人物详情 | `#character-leon-s-kennedy` |
| 剧情目录 | `#story` |
| 剧情章节 | `#story-01` |

## 技术栈

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/)
- 原生 CSS
- ESLint
- GitHub Actions / GitHub Pages

## 本地开发

环境要求：Node.js 22 或兼容版本、npm。

```bash
git clone https://github.com/YUKINO1-3/Re-9.git
cd Re-9
npm install
npm run dev
```

启动后，根据终端提示访问本地开发地址。

## 可用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动 Vite 开发服务器 |
| `npm run build` | 生成生产构建至 `dist/` |
| `npm run preview` | 本地预览生产构建 |
| `npm run lint` | 运行 ESLint 检查 |

提交代码前建议执行：

```bash
npm run lint
npm run build
```

## 项目结构

```text
Re-9/
├─ .github/workflows/deploy.yml  # GitHub Pages 部署流程
├─ public/                       # 人物图片、Hero 动图与背景音乐
├─ src/
│  ├─ App.jsx                    # 页面数据、视图与导航逻辑
│  ├─ App.css                    # 页面视觉与响应式样式
│  ├─ index.css                  # 全局基础样式
│  └─ main.jsx                   # React 入口
├─ index.html
├─ package.json
└─ vite.config.js                # Vite 与 Pages 基础路径配置
```

## 部署

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动执行以下流程：

1. 使用 Node.js 22 安装依赖；
2. 执行 `npm run build`；
3. 上传 `dist/` 构建产物；
4. 发布到 GitHub Pages。

由于站点部署在仓库子路径下，`vite.config.js` 中的 `base` 配置为 `/Re-9/`。公共资源统一通过 `import.meta.env.BASE_URL` 生成路径，避免开发环境与 Pages 环境产生差异。

## 资料来源与版权说明

人物基础介绍主要参考 [CAPCOM《Resident Evil Requiem》官方网站](https://www.residentevil.com/requiem/en-asia/)。未正式公开的年龄或背景信息会在页面中标记为“官方未公开”，避免将推测表述为官方设定。

本仓库仅用于前端开发与作品资料整理展示，请勿将其中的图片、音频或游戏内容用于商业用途。
