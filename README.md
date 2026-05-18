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

### 1. 构建产物

```bash
npm run build
```

产物输出到 `dist/` 目录。

### 2. pm2 启动主页服务

本项目是纯静态页面，pm2 内置了静态文件服务器，直接一条命令启动：

```bash
pm2 serve dist 3000 --spa --name "jianbing-gouzi"
```

- `dist` — 构建产物目录
- `3000` — 服务端口（nginx `proxy_pass` 指向这个端口）
- `--spa` — 自动回退到 `index.html`，React Router 正常工作
- `--name` — pm2 进程名，方便管理

更新部署只需重新构建后重启：

```bash
npm run build && pm2 restart jianbing-gouzi
```

常用 pm2 呡令：

```bash
pm2 list                # 查看所有进程
pm2 logs jianbing-gouzi # 查看日志
pm2 restart jianbing-gouzi  # 重启服务
pm2 stop jianbing-gouzi     # 停止服务
pm2 delete jianbing-gouzi   # 删除进程
pm2 save                # 保存进程列表（开机自启用）
pm2 startup             # 设置开机自启
```

### 3. Nginx 配置

在你的 nginx 配置文件中添加以下内容（可放在 `/etc/nginx/conf.d/jianbing.conf` 或主配置文件中）：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名或 IP

    # ========== 主页（pm2 静态服务） ==========

    location / {
        proxy_pass http://127.0.0.1:3000;  # pm2 serve 的端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
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

    # 50x 错误页面
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /path/to/your/project/dist;  # 替换为项目 dist 目录的绝对路径
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

### 4. 关键配置说明

- **`pm2 serve --spa`**：pm2 内置的静态服务器，`--spa` 模式会自动将所有未匹配路径回退到 `index.html`，React Router 正常处理 404 等路由。
- **`location /`**：所有路径由 nginx 代理到 pm2 服务。`/chat-room` 等精确匹配的 location 会优先被捕获，不会落到 `location /`。
- **`proxy_pass` 的 location 优先级**：nginx 精确匹配优先。`/chat-room` 等路径会被对应 location 捕获并转发到各自后端。
- **`50x.html`**：由于 50x 错误时 pm2 服务本身可能不可用，这个静态页面需要 nginx 直接读取磁盘文件，所以 `root` 要指向项目 `dist` 目录的绝对路径。
- **端口规划建议**：主页用 3000，三个服务各自用不同端口，nginx 按路径转发。

### 5. 检查与生效

```bash
# 检查配置语法
nginx -t

# 重载配置
nginx -s reload
```

### 6. HTTPS（推荐）

如果需要 HTTPS，可以用 certbot 自动配置：

```bash
certbot --nginx -d your-domain.com
```

nginx 会自动补充 SSL 相关配置。