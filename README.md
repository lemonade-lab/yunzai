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
git clone --depth=1 https://github.com/yoimiya-kokomi/Miao-Yunzai.git && cd Miao-Yunzai
git clone --depth=1 https://github.com/yoimiya-kokomi/miao-plugin.git ./plugins/miao-plugin/
```

- AlemonJS 

```sh
git clone --depth=1 https://github.com/lemonade-lab/yunzai.git ./alemonjs
```

推荐使用 yarn

```sh
npm install  yarn@1.19.1 -g --registry=https://registry.npmmirror.com
yarn install
yarn add alemonjs @alemonjs/gui @alemonjs/process -D
```

### 桌面启动

- 访问官网下载桌面

- 点击“以指定目录打开应用”，选择Miao-Yunzai后，等待重启



### Node启动

> 默认 --login gui 即登录沙盒环境

> 登录其他平台请了解 https://alemonjs.com/docs/environment

```sh
node src/main.js
```

### 进程托管

> 运行后会生成 `alemon.config.yaml` 并启动 gui

> 如果已经自定义配置 `alemon.config.yaml`但未补充pm2请参考

```yaml
pm2:
  apps:
    - name: 'gui'
      script: 'node alemonjs/main.js --login gui'
      env:
        NODE_ENV: 'production'
```

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

## 沙盒测试

- 安装 vscode

- 安装 gui 扩展

[alemonjs gui](https://marketplace.visualstudio.com/items?itemName=lemonade-x.alemonjs-gui)
