const fs = require('fs')
const yaml = require('yaml')
const path = require('path')

const configDir = path.join(process.cwd(), 'alemon.config.yaml')

const initData = `pm2:
  apps:
    - name: 'gui'
      script: 'node src/main.js'
      env:
        NODE_ENV: 'production'
`

let data = ''

// 检查 alemon.config.yaml 文件
if (!fs.existsSync(configDir)) {
  // 不存在 alemon.config.yaml 文件
  data = initData
  // 写入默认配置
  fs.writeFileSync(configDir, data)
} else {
  data = fs.readFileSync(configDir, 'utf8')
}

// 解析 alemon.config.yaml 文件
const config = yaml.parse(data)

let app = config?.pm2

if (!config?.pm2) {
  app = yaml.parse(initData)?.pm2
  // tip
  console.log('alemon.config.yaml 文件中缺少 pm2 配置')
  console.log(initData)
}

/**
 * @type {{ apps: import("pm2").StartOptions[] }}
 */
module.exports = {
  ...app
}
