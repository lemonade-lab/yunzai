# Yunzai 插件启动脚本 A

脚本 A 是在 yunzai 的基础上启动 alemonjs 机器人的脚本

该启动脚本不需要改 Miao 崽任何内容源码即可使用！

> 是不是碉堡了？

当前仅处理公共消息和私信，其他类型的消息都将忽略。。。

插件库 [Yunzai-Bot-plugins-index](https://github.com/yhArcadia/Yunzai-Bot-plugins-index)

Miao 崽 [Miao-Yunzai](https://github.com/yoimiya-kokomi/Miao-Yunzai)

开发文档 [alemonjs.com](https://alemonjs.com)

## 使用方法

环境：Chrome/Chromium/Edge && Nodejs && Redis

- Miao 崽

```sh
git clone --depth=1 https://github.com/yoimiya-kokomi/Miao-Yunzai.git
cd Miao-Yunzai
git clone --depth=1 https://github.com/yoimiya-kokomi/miao-plugin.git ./plugins/miao-plugin/
```

推荐使用 yarn

```sh
npm install  yarn@1.19.1 -g --registry=https://registry.npmmirror.com
yarn install
```

- 脚本 A

```sh
git clone --depth=1 https://github.com/lemonade-lab/yunzai.git ./src
```

安装机器人

```sh
yarn add alemonjs @alemonjs/gui  -D
```

启动 gui

```sh
node src/main.js --login gui
```

## @alemonjs/qq-bot

> 如果你想登录 wechat、kook、dc、tg 等可自行阅读文档

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

补充配置(可忽略)

```yaml
qq-bot:
  # 默认(可不填)
  route: "/webhook"
  # 默认(可不填)
  port: 17157
  # log 会显示每条消息的[Date][ChannleId][UserKey]...
  # 判断是否是为主人
  # 不是id哦，key是由alemonjs生产的
  master_key:
    - ""
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

### 内网穿透

[dashboard.ngrok.com](https://dashboard.ngrok.com)

```sh
ngrok http 17157 --host-header="localhost:17157"  --url=[你的免费地址]
```

测试访问

[你的免费地址]/webhook

## 沙盒测试

安装 vscode 安装插件

[alemonjs gui](https://marketplace.visualstudio.com/items?itemName=lemonade-x.alemonjs-gui)

## 后台运行

补充配置 `alemon.config.yaml`

```yaml
pm2:
  apps:
    - name: "qq-bot"
      script: "node src/main.js --login qq-bot"
      env:
        NODE_ENV: "production"
```

```sh
# start
npx pm2 startOrRestart src/pm2.config.cjs
# stop
npx pm2 stop src/pm2.config.cjs
# delete
npx pm2 delete src/pm2.config.cjs
# kill
npx pm2 kill
```
