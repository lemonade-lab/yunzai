import fs from 'fs'
import { join } from 'path'
const dir = join(process.cwd(), 'config', 'config', 'bot.yaml')
const ddir = join(process.cwd(), 'config', 'default_config', 'bot.yaml')
// 正则表达式匹配 skip_login: false，允许任意数量的空格
const regex = /skip_login:\s*false/

const update = () => {
  // 替换 skip_login: false 为 skip_login: true
  const data = fs.readFileSync(dir, 'utf8')
  const newData = data.replace(regex, 'skip_login: true')
  fs.writeFileSync(dir, newData)
}

const updateDefault = () => {
  const data = fs.readFileSync(ddir, 'utf8')
  const newData = data.replace(regex, 'skip_login: true')
  fs.writeFileSync(ddir, newData)
}

if (fs.existsSync(dir)) {
  update()
} else if (fs.existsSync(ddir)) {
  updateDefault()
}

if (fs.existsSync(dir)) {
  update()
}
