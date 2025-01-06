const fs = require('fs')
const yaml = require('yaml')
const path = require('path')
const data = fs.readFileSync(
  path.join(process.cwd(), 'alemon.config.yaml'),
  'utf8'
)
const config = yaml.parse(data)
console.log('config', config)
const app = config?.pm2 ?? {}
/**
 * @type {{ apps: import("pm2").StartOptions[] }}
 */
module.exports = {
  ...app
}
