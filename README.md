# Yunzai 插件启动脚本 A

脚本 A 是在 yunzai 的基础上启动 alemonjs 机器人的脚本

该启动脚本不需要改 Miao 崽任何内容源码即可使用！

> 是不是碉堡了？

当前仅处理公共消息和私信，其他类型的消息都将忽略。。。

插件库 [Yunzai-Bot-plugins-index](https://github.com/yhArcadia/Yunzai-Bot-plugins-index)

Miao 崽 [Miao-Yunzai](https://github.com/yoimiya-kokomi/Miao-Yunzai)

开发文档 [alemonjs.com](https://alemonjs.com)


## 使用方法

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

### 必要环境

推荐使用docker

- Settings > Docker Engine

```json
{
  "registry-mirrors": [
    "https://registry.cn-hangzhou.aliyuncs.com"
  ]
}
```

- docker-compose.yml

```yaml
services:
  redis:
    image: redis:6.2-alpine
    container_name: redis-container
    ports:
      - '6379:6379'
```

启动

```sh
docker-compose up -d
```

### 桌面启动

编辑配置并补充以下内容

> 如果安装有nodejs也可以先nodejs启动后，再考虑转为桌面

- 访问官网下载桌面

- 点击“以指定目录打开应用”，选择Miao-Yunzai后，等待重启

### Node启动

> 需要安装环境nodejs

推荐使用 yarn

```sh
npm install  yarn@1.19.1 -g --registry=https://registry.npmmirror.com
yarn install
yarn add alemonjs @alemonjs/gui @alemonjs/process @alemonjs/db @alemonjs/qq-bot jsxp -D
```

- package.json

```json
{
  "private": true,
  "workspaces": [
    "packages/*",
    "plugins/*"
  ]
}
```

> 默认 --login gui 即登录沙盒环境

> 登录其他平台请了解 https://alemonjs.com/docs/environment

```sh
node alemonjs/index.js
```

### 进程托管

> 运行后会生成 `alemon.config.yaml` 并启动 gui

> 如果已经自定义配置 `alemon.config.yaml`但未补充pm2请参考

```yaml
pm2:
  apps:
    - name: 'gui'
      script: 'node alemonjs/index.js --login gui'
      env:
        NODE_ENV: 'production'
```

> 操作

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

## 更新脚本

```sh
cd alemonjs && git pull
```

## 沙盒测试

- 安装 vscode

- 安装 alemonjs-gui 扩展

[alemonjs gui](https://marketplace.visualstudio.com/items?itemName=lemonade-x.alemonjs-gui)
