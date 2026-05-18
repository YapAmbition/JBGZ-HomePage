# 煎饼狗子的小岛

动森风格的个人主页，使用 React + Vite + TypeScript + animal-island-ui 构建。

## 页面路由

| 路径 | 说明 |
|------|------|
| `/` | 主页 |
| `/chat-room` | 聊天室 |
| `/md-view` | 文档阅读 |
| `/march-7th` | 三月七（AI 助手） |

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:5173

## 生产构建

```bash
npm run build
```

产物输出到 `dist/` 目录。

## 部署到云服务器

### 1. 上传产物

将 `dist/` 目录的全部内容上传到服务器，例如：

```bash
scp -r dist/* user@your-server:/var/www/jianbing-gouzi/
```

或使用 rsync：

```bash
rsync -avz dist/ user@your-server:/var/www/jianbing-gouzi/
```

### 2. Nginx 配置

在你的 nginx 配置文件中添加以下内容（可放在 `/etc/nginx/conf.d/jianbing.conf` 或主配置文件中）：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名或 IP

    root /var/www/jianbing-gouzi;  # 替换为实际的产物目录路径
    index index.html;

    # SPA 路由：所有未匹配的路径回退到 index.html，交给 React Router 处理
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存（JS/CSS/图片等带 hash 的文件）
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 图片缓存
    location /images/ {
        expires 30d;
        add_header Cache-Control "public";
    }

    # favicon 缓存
    location = /vite.svg {
        expires 30d;
        add_header Cache-Control "public";
    }

    # 50x 错误页面（静态 HTML，不依赖 React 应用）
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /var/www/jianbing-gouzi;
        internal;
    }
}
```

### 3. 关键配置说明

- **`try_files`**：SPA 应用的核心配置。nginx 先尝试匹配静态文件，找不到则返回 `index.html`，由 React Router 在前端处理路由。这样 `/chat-room`、`/md-view`、`/march-7th` 等路由都能正常工作，直接访问也不会 404。
- **`/assets/` 缓存**：Vite 构建的 JS/CSS 文件名自带 hash（如 `index-DRzNbV4z.js`），可以安全地设置长期缓存（1 年），更新部署时文件名会变化，缓存自动失效。
- **`error_page`**：当后端服务出现 500/502/503/504 错误时，nginx 会展示项目内置的动森风格 50x.html 错误页面，而不是默认的丑陋错误页。

### 4. 检查与生效

```bash
# 检查配置语法
nginx -t

# 重载配置
nginx -s reload
```

### 5. HTTPS（推荐）

如果需要 HTTPS，可以用 certbot 自动配置：

```bash
certbot --nginx -d your-domain.com
```

nginx 会自动补充 SSL 相关配置。