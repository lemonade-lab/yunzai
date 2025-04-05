import './src/icqq/updateYaml.js'
import { start } from 'alemonjs'
import { dirname } from 'path'
import { join } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const index = join(__dirname, 'src/index.js')
const app = index
  .replace(/\\/g, '/')
  .replace(process.cwd().replace(/\\/g, '/'), '')
  .replace(/^\//, '')
start(app)
