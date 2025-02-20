import { Client } from './index.js'
/**
 * *********
 * 必要存储
 * *********
 */
global.NoteCookie = {}
global.BotConfig = {}
const Bot = new Client('self_id')
global.Bot = Bot
global.Bot[Bot.uin] = global.Bot
