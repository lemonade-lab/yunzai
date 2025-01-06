import { mkdirSync } from 'fs'
import { getConfig } from 'alemonjs'
/**
 * ********
 * 必要目录
 * ********
 */
mkdirSync('./temp/html', { recursive: true })
mkdirSync('./resources', { recursive: true })
mkdirSync('./data', { recursive: true })
/**
 * *********
 * 必要存储
 * *********
 */
global.NoteCookie = {}
global.BotConfig = {}
/**
 * *******
 * icqq
 * *******
 */
global.Bot = {
  uin: 'self_id',
  logger: global.logger,
  /**
   * 消息转发
   * @param {} val
   * @returns
   */
  makeForwardMsg: val => {
    const getText = val => {
      if (Array.isArray(val)) {
        const str = val.map(v => v.message)
        return str.join('\n')
      } else if (typeof val === 'string') {
        return val
      }
      return ''
    }
    const text = getText(val)
    // console.log('text', text)
    if (/(http|https)/.test(text)) {
      // const config = getConfig()
      // console.log('config', config)
      // if (config.argv.login == 'qq-bot') {
      //   const reg = /http[s]?:\/\/[a-zA-Z0-9\.\?&=\/]+/g
      //   console.log('text', text)
      //   return text.replace(reg, '[内容已被平台隐藏.请在查看控制台]')
      // }
    }
    return text
  },
  /**
   * 得到icqq的好友列表
   */
  getFriendList: () => {
    return []
  },
  getGroupList: () => {
    return []
  },
  pickUser: uid => {
    return {
      sendMsg: val => ''
    }
  },
  pickGroup: gid => {
    return null
  },
  nickname: '',
  getGroupMemberInfo: (val1, val2) => {
    return {
      card: '',
      nickname: ''
    }
  },
  fl: {
    get: val => ''
  },
  gl: {
    get: val => ''
  }
}
global.Bot['self_id'] = global.Bot
