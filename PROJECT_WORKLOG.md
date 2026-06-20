# Re-9 项目操作记录

## 1. 项目初始化

在当前目录使用 npm、React 和 Vite 创建了一个最小可运行项目。

使用的主要命令：

```bash
npm create vite@latest . -- --template react
npm install
```

初始化后删除了 Vite 默认演示内容及未使用资源，将页面精简为基础 React 入口。

项目主要结构：

```text
Re-9/
├─ .github/
│  └─ workflows/
│     └─ deploy.yml
├─ public/
│  ├─ Leon 1.jpg
│  ├─ re9_hero.gif.gif
│  └─ Resident Evil_ Requiem Launch Day Livestream – First Playthrough.jpg
├─ src/
│  ├─ App.css
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ .gitignore
├─ index.html
├─ package.json
├─ package-lock.json
└─ vite.config.js
```

## 2. 主页面开发

将初始页面改造成《生化危机：安魂曲》角色介绍页。

页面包含：

- Hero 首屏区域
- 格蕾丝·阿什克罗夫特角色档案
- 里昂·S·肯尼迪角色档案
- 艾丽莎·阿什克罗夫特角色档案
- 内森·登普西角色档案
- 艾米丽角色档案
- 维克托·吉迪恩角色档案
- 游戏事件背景介绍
- CAPCOM 官方资料来源链接
- 桌面端与移动端响应式布局

角色资料根据 CAPCOM 官方公开内容整理，页面明确标注为非官方网站。

## 3. Leon 图片接入

将以下本地图片用于 Leon 角色卡：

```text
public/Leon 1.jpg
```

代码通过 Vite 的基础路径读取该资源：

```jsx
const publicAsset = (fileName) => `${import.meta.env.BASE_URL}${fileName}`

image: publicAsset('Leon%201.jpg')
```

图片使用 `object-fit: cover` 进行响应式裁切。

## 4. Leon 外部资料链接

在 Leon 简介文字下方添加了英文维基百科链接：

```text
https://en.wikipedia.org/wiki/Leon_S._Kennedy
```

链接在新标签页中打开，并设置了：

```jsx
target="_blank"
rel="noreferrer"
```

## 5. Hero 动图接入

将以下文件设置为 Hero 区域动态背景：

```text
public/re9_hero.gif.gif
```

注意：该文件实际名称包含双扩展名 `.gif.gif`，代码按照现有文件名引用。

为了保证标题可读性，Hero 区域额外加入：

- 横向暗色渐变遮罩
- 底部暗色渐变
- 降低饱和度
- 提高对比度
- 响应式背景裁切

## 6. 代码质量验证

每次主要修改后均运行以下检查：

```bash
npm run lint
npm run build
```

最终检查结果：

- ESLint 检查通过
- Vite 生产构建通过
- npm 安装检查未发现安全漏洞

本地启动命令：

```bash
npm run dev
```

生产构建命令：

```bash
npm run build
```

## 7. Git 本地仓库

在项目根目录初始化 Git 仓库：

```bash
git init -b main
```

Git 用户配置检查结果：

```text
user.name: SHITA
user.email: sihanfan518@gmail.com
```

首次提交：

```text
f4cf1fd feat: initialize React Vite project
```

部署配置提交：

```text
948e065 ci: deploy site to GitHub Pages
```

## 8. GitHub 远程仓库

配置的远程仓库：

```text
https://github.com/YUKINO1-3/Re-9.git
```

远程名称：

```text
origin
```

配置命令：

```bash
git remote add origin https://github.com/YUKINO1-3/Re-9.git
```

本地 `main` 分支已成功推送，并设置为跟踪远程分支：

```bash
git push -u origin main
```

## 9. GitHub Pages 部署配置

为适配 GitHub Pages 仓库子路径，在 `vite.config.js` 中配置：

```js
export default defineConfig({
  base: '/Re-9/',
  plugins: [react()],
})
```

同时将 `public` 资源改为基于 `import.meta.env.BASE_URL` 引用，避免部署后图片路径失效。

添加了 GitHub Actions 工作流：

```text
.github/workflows/deploy.yml
```

工作流会在以下情况运行：

- 推送到 `main` 分支
- 在 GitHub Actions 页面手动触发

工作流执行步骤：

1. 检出仓库代码
2. 安装 Node.js 22
3. 配置 GitHub Pages
4. 使用 `npm ci` 安装依赖
5. 使用 `npm run build` 构建项目
6. 上传 `dist` 构建产物
7. 部署到 GitHub Pages

## 10. Pages 当前状态与操作要求

首次 GitHub Actions 工作流已经触发，但在 `Configure Pages` 步骤失败。原因是仓库需要先启用 GitHub Pages，并将部署来源设为 GitHub Actions。

Pages 设置地址：

```text
https://github.com/YUKINO1-3/Re-9/settings/pages
```

需要在该页面将 **Source** 设置为：

```text
GitHub Actions
```

然后打开 Actions：

```text
https://github.com/YUKINO1-3/Re-9/actions
```

重新运行方式：

1. 点击左侧的 `Deploy to GitHub Pages`
2. 点击右侧的 `Run workflow`
3. 分支选择 `main`
4. 点击绿色的 `Run workflow`

部署成功后的预计访问地址：

```text
https://yukino1-3.github.io/Re-9/
```

## 11. 后续修改与发布流程

以后修改项目后可执行：

```bash
git add .
git commit -m "描述本次修改"
git push
```

推送到 `main` 后，GitHub Actions 会自动重新构建并部署网站。

