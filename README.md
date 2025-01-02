# Yunzai 插件启动脚本 A

脚本 A 是在 yunzai 的基础上启动 alemonjs 机器人的脚本

更多内容请阅读 [https://alemonjs.com](https://alemonjs.com)

当前仅处理公共消息和私信，其他类型的消息都将忽略。。。

## 使用方法

Miao-Yunzai 目录下安装

```sh
git clone --depth=1 https://github.com/lemonade-lab/yunzai.git ./src
```

修改配置 `config/default_config/bot.yaml`

或 `config/config/bot.yaml`

```yaml
# 是否跳过登录ICQQ
skip_login: true
```

推荐使用 yarn

```sh
npm install  yarn@1.19.1 -g --registry=https://registry.npmmirror.com
```

安装机器人

```sh
yarn add alemonjs @alemonjs/qq-bot -D
```

创建配置 `alemon.config.yaml`

```yaml
qq-bot:
  # 编号
  app_id: ""
  # 令牌
  token: ""
  # 密钥
  secret: ""
```

```yaml
qq-bot:
  # 默认(可不填)
  route: "/webhook"
  # 默认(可不填)
  port: 17157
```

启动机器人

> 看到密钥刷新即登录成功

```sh
node src/main.js --login qq-bot
```

### 配置 webhook

> QQ 平台配置 https://[domain name]/webhook

> 记得勾选想要接收的事件！！！

> 记得勾选想要接收的事件！！！

> 记得勾选想要接收的事件！！！

使用 nginx 代理

```conf
 server {
        listen       443 ssl http2;
        server_name  bundle.com;
        # 记得申请域名
        ssl_certificate /usr/local/nginx/bundle.crt;
        ssl_certificate_key /usr/local/nginx/bundle.key;
        location /webhook {
          # 指向本地 webhook 服务
          proxy_pass http://localhost:17157;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header X-Forwarded-Proto $scheme;
        }
}
```

### 分发地址

> 支持本地连接服务器，进行本地开发

使用 nginx 代理

```conf
 server {
        location /websocket {
          # 指向本地 websocket 服务
           proxy_pass http://localhost:17157;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
        }
}
```

```yaml
qq-bot:
  # ... more， 其他信息也得填上哦。
  # 如果你做了webhook服务器，可以连接服务器上的ws服务。
  ws: "wss://[domain name]/websocket"
```

### 沙盒测试

如果你想本地测试，

```sh
yarn add @alemonjs/gui -D
```

```yaml
gui:
  port: 17127
```

安装 vscode 安装插件

[alemonjs gui](https://marketplace.visualstudio.com/items?itemName=lemonade-x.alemonjs-gui)

启动 gui

```sh
node src/main.js --login gui
```

### 内网穿透

[https://dashboard.ngrok.com](https://dashboard.ngrok.com)

```sh
ngrok http 17157 --host-header="localhost:17157"  --url=[你的免费地址]
```

测试访问

[你的免费地址]/webhook
