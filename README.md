# Yunzai 插件启动脚本 A

脚本 A 是在 yunzai 的基础上启动 alemonjs 机器人的脚本

该启动脚本不需要改 Miao 崽任何内容源码即可使用！

> 是不是碉堡了？

当前仅处理公共消息和私信，其他类型的消息暂未支持

插件库 [Yunzai-Bot-plugins-index](https://github.com/yhArcadia/Yunzai-Bot-plugins-index)

Miao 崽 [Miao-Yunzai](https://github.com/yoimiya-kokomi/Miao-Yunzai)

## 安装

> 需要安装工具git

- Miao 崽

```sh
git clone --depth=1 https://github.com/yoimiya-kokomi/Miao-Yunzai.git
cd Miao-Yunzai
git clone --depth=1 https://github.com/yoimiya-kokomi/miao-plugin.git ./plugins/miao-plugin/
```

- AlemonJS

```sh
git clone --depth=1 https://github.com/lemonade-lab/yunzai.git ./alemonjs
```

## 使用

可以选择服务版、桌面版、或PM2进行管理

### alemongo

阿柠檬机器人服务版，替换work/resources/template 以更内部模板

> 更多内容请阅读 https://alemonjs.com

### alemondesk

阿柠檬机器人桌面版，替换work/resources

> 更多内容请阅读 https://alemonjs.com

### PM2

- 安装

```sh
yarn add alemonjs @alemonjs/db @alemonjs/qq-bot
```

> 运行后会生成 `alemon.config.yaml` 并启动 gui

> 如果已经自定义配置 `alemon.config.yaml`但未补充pm2请参考

```yaml
pm2:
  apps:
    - name: 'qq-bot'
      script: 'node alemonjs/index.js --login qq-bot'
      env:
        NODE_ENV: 'production'
```

- 操作

```sh
# start
npx pm2 startOrRestart alemonjs/pm2.config.cjs
# stop
npx pm2 stop alemonjs/pm2.config.cjs
# delete
npx pm2 delete alemonjs/pm2.config.cjs
# kill
npx pm2 kill
```
