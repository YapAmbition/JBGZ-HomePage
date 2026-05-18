# 煎饼狗子的小岛

动森风格的个人主页，使用 React + Vite + TypeScript + animal-island-ui 构建。

## 页面路由

本项目只负责主页 `/`，以下三个路径由独立服务提供，nginx 反向代理到对应后端：

| 路径 | 说明 | 提供方 |
|------|------|--------|
| `/` | 动森风格主页 | 本项目（静态页面） |
| `/chat-room` | 聊天室 | 独立服务 |
| `/md-view` | 文档阅读 | 独立服务 |
| `/march-7th` | 三月七（AI 助手） | 独立服务 |

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

    # ========== 主页（本项目的静态页面） ==========

    # SPA 路由：匹配主页的静态资源后，其他路径回退到 index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存（JS/CSS 等带 hash 的文件）
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

    # ========== 独立服务（反向代理） ==========

    # 聊天室服务
    location /chat-room {
        proxy_pass http://127.0.0.1:CHAT_ROOM_PORT;  # 替换为聊天室服务的实际端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 文档阅读服务
    location /md-view {
        proxy_pass http://127.0.0.1:MD_VIEW_PORT;  # 替换为文档阅读服务的实际端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 三月七（AI 助手）服务
    location /march-7th {
        proxy_pass http://127.0.0.1:MARCH_7TH_PORT;  # 替换为三月七服务的实际端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # ========== 错误页面 ==========

    # 50x 错误页面（静态 HTML，不依赖 React 应用）
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /var/www/jianbing-gouzi;
        internal;
    }
}
```

**注意**：将 `CHAT_ROOM_PORT`、`MD_VIEW_PORT`、`MARCH_7TH_PORT` 替换为你各服务实际运行的端口。

如果你的服务路径有前缀（比如聊天室服务内部路径是 `/` 而不是 `/chat-room`），可以在 `proxy_pass` 末尾加 `/` 来去掉前缀：

```nginx
# 假设聊天室服务内部路径是 / 而不是 /chat-room
location /chat-room {
    proxy_pass http://127.0.0.1:3001/;  # 末尾的 / 会去掉 /chat-room 前缀
}
```

### 3. 关键配置说明

- **`location /` 的 `try_files`**：nginx 先匹配静态文件（主页资源），找不到则回退到 `index.html`，由 React Router 处理 404。注意 `/chat-room`、`/md-view`、`/march-7th` 这三个 location 写在前面，nginx 会优先匹配它们并走 `proxy_pass`，不会落到 `try_files` 里。
- **`/assets/` 缓存**：Vite 构建的 JS/CSS 文件名自带 hash，可以安全地设置长期缓存（1 年），更新部署时文件名变化，缓存自动失效。
- **`proxy_pass` 的 location 优先级**：nginx 的 location 匹配规则是精确匹配优先。`/chat-room` 等路径会被对应 location 捕获并转发到各自后端，不会落到 `location /` 的 `try_files`。
- **`error_page`**：服务器出现 500/502/503/504 时，展示动森风格的 50x.html 错误页。

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