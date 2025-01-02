# yunzai 插件启动包

## 使用方法

miao-yunzai 目录下安装

```sh
git clone git@github.com:lemonade-lab/yunzai.git ./src
```

修改配置 config/default_config/bot.yaml

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
gui:
  port: 17127

qq-bot:
  # 如果你做了webhook服务器，可以连接服务器上的机器人
  ws: "wss://xxxx.com/ws"
```

启动

```sh
node src/main.js --login qq-bot
```
