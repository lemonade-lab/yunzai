// import { getConfig } from 'alemonjs'
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
    // if (/http:\/\/[a-zA-Z0-9\.\-]+/.test(text)) {
    //   const config = getConfig()
    //   if (config.argv.login == 'qq-bot') {
    //     const reg = /http:\/\/[a-zA-Z0-9\.\-]+/g
    //     const urls = text.match(reg)
    //     urls.forEach(url => {
    //       console.log('[被隐藏的内容]', url)
    //     })
    //     return text.replace(reg, '[隐藏内容(控制台)]')
    //   }
    // }
    return text
  },
  /**
   * 得到icqq的好友列表
   */
  getFriendList: () => [],
  getGroupList: () => [],
  pickUser: uid => {
    return {
      sendMsg: val => ''
    }
  },
  pickGroup: gid => null,
  nickname: '',
  getGroupMemberInfo: (val1, val2) => {
    return {
      card: '',
      nickname: ''
    }
  },
  /** 好友列表 */
  fl: new Map(),
  /** 陌生人列表 */
  sl: new Map(),
  /** 群列表 */
  gl: new Map(),
  /** 群员列表缓存 */
  gml: new Map(),
  /** 我加入的频道列表 */
  guilds: new Map(),
  /** 黑名单列表 */
  blacklist: new Set(),
  /** 好友分组 */
  classes: new Map()
}
global.Bot['self_id'] = global.Bot
