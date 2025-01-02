# yunzai 插件启动包

## 使用方法

miao-yunzai 目录下安装

```sh
git clone --depth=1 https://github.com/lemonade-lab/yunzai.git ./src
```

修改配置 config/default_config/bot.yaml
或 config/config/bot.yaml

```yaml
# 是否跳过登录ICQQ
skip_login: true
```

安装机器人

```sh
yarn add alemonjs @alemonjs/gui @alemonjs/qq-bot
```

创建配置

```yaml
gui:
  port: 17127

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
  # 如果你做了webhook服务器，可以连接服务器上的机器人
  ws: "wss://xxxx.com/ws"
  # ... more， 其他信息也得填上哦。
```

启动

```sh
node src/main.js --login qq-bot
```

如果你想本地测试，

可以打开 vscode 安装插件

[alemonjs gui](https://marketplace.visualstudio.com/items?itemName=lemonade-x.alemonjs-gui)

启动 gui

```sh
node src/main.js --login gui
```

更多内容请阅读 [https://alemonjs.com](https://alemonjs.com)
