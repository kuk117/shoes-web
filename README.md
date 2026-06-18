# 莆田正奇鞋业咨询网站 - Vue 3 版本

这是从 Next.js 一比一重构的纯前端三件套（HTML/CSS/JS + Vue 3）版本。

## 项目结构

```
vue-shoe-website/
├── index.html              # 首页
├── about.html             # 关于正奇
├── services.html          # 咨询服务
├── cases.html             # 案例成果
├── contact.html           # 联系咨询
├── css/
│   └── style.css          # 全局样式
├── js/
│   ├── app.js             # 应用入口（未使用，各页面独立引入）
│   └── components/        # Vue 组件
│       ├── Navbar.js      # 导航栏组件
│       ├── Footer.js      # 页脚组件
│       ├── BottomCTA.js   # 底部CTA组件
│       ├── CounterAnimation.js  # 数字滚动动画组件
│       ├── MotionShell.js # 页面动画容器组件
│       └── AIAssistant.js # AI助手组件
└── images/                # 图片资源目录（可选）
```

## 技术栈

- **HTML5**: 语义化标签
- **CSS3**: 原生 CSS，完全复刻 Tailwind CSS 样式
- **Vue 3**: 通过 CDN 引入，使用组件化开发
- **原生 JavaScript**: ES6+ 模块化

## 特性

✅ **一比一复刻**：严格按照原 Next.js 版本的布局、样式、交互进行重构  
✅ **Vue 3 组件化**：所有可复用部分都封装为 Vue 组件  
✅ **响应式设计**：完整保留移动端和桌面端适配  
✅ **动画效果**：滚动动画、悬停效果、页面过渡等完全保留  
✅ **无构建工具**：直接在浏览器中运行，无需 npm/webpack  

## 快速开始

### 方法 1：使用 Python 简易服务器

```bash
# 进入项目目录
cd vue-shoe-website

# 启动服务器（Python 3）
python -m http.server 8080

# 或使用 Python 2
python -S SimpleHTTPServer 8080
```

然后在浏览器访问：http://localhost:8080

### 方法 2：使用 Node.js 服务器

```bash
# 安装 http-server（全局安装一次）
npm install -g http-server

# 在项目目录启动
http-server -p 8080
```

### 方法 3：使用 VS Code Live Server

1. 安装 VS Code 扩展：Live Server
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

### 方法 4：直接打开（部分功能可能受限）

由于浏览器的 CORS 限制，直接打开 HTML 文件可能导致 ES6 模块加载失败。  
建议使用上述任一方法启动本地服务器。

## 页面说明

- **index.html**: 首页，展示公司定位、服务特点、数据统计和改善流程
- **about.html**: 关于页面，介绍公司理念和服务原则
- **services.html**: 服务页面，详细介绍四大服务类型和切入路径
- **cases.html**: 案例页面，展示四个典型客户案例
- **contact.html**: 联系页面，包含在线留言表单和联系方式

## 组件说明

### Navbar（导航栏）
- 响应式导航菜单
- 滚动时背景透明度变化
- 当前页面高亮显示

### Footer（页脚）
- 公司信息
- 快速导航链接
- 联系方式

### BottomCTA（底部行动号召）
- 可自定义标题、描述和按钮
- 响应式布局

### CounterAnimation（数字动画）
- 数字滚动动画效果
- 进入视口时自动触发
- 支持前缀和后缀

### MotionShell（动画容器）
- 页面滚动进度条
- 滚动视差效果
- 元素进入视口时的淡入动画

### AIAssistant（AI助手）
- 浮动聊天按钮
- 聊天界面
- 流式响应（需要后端API支持）

## 样式复刻说明

所有样式都从 Tailwind CSS 转换为原生 CSS：

- **容器**: `.container-page` 替代 Tailwind 的 container
- **间距**: 使用 clamp() 实现响应式间距
- **网格**: 使用 CSS Grid 和 flexbox
- **动画**: 使用 @keyframes 和 transition
- **响应式**: 使用媒体查询

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 注意事项

1. **图片资源**: 当前使用 Unsplash CDN 图片，生产环境建议替换为本地图片
2. **AI 助手**: 需要配置后端 API 接口 `/api/chat` 才能正常工作
3. **表单提交**: 当前为演示效果，需要接入真实后端接口

## 部署

### 静态托管平台

可直接部署到：
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

只需将整个目录上传即可，无需构建步骤。

### 传统服务器

上传到任何支持静态文件的 Web 服务器（Nginx、Apache 等）。

## 与原版对比

| 特性 | Next.js 版本 | Vue 3 版本 |
|------|-------------|-----------|
| 框架 | Next.js + React | 纯 HTML + Vue 3 (CDN) |
| 样式 | Tailwind CSS | 原生 CSS |
| 构建 | 需要 npm build | 无需构建 |
| SEO | 服务端渲染 | 静态 HTML |
| 部署 | 需要 Node.js | 任何静态服务器 |
| 文件大小 | ~2MB（含依赖） | ~100KB（不含图片） |

## 开发指南

### 修改样式
编辑 `css/style.css` 文件即可。

### 添加新页面
1. 复制现有 HTML 文件
2. 修改内容部分
3. 保持 navbar、footer、ai-assistant 组件不变

### 修改组件
编辑 `js/components/` 目录下的对应组件文件。

## License

版权所有 © 2026 莆田正奇鞋业咨询
