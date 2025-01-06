import { mkdirSync } from 'fs'
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
    /**
     * {
     *   user_id:'',
     *   nickname:'',
     *   message:''
     * }[]
     */
    if (Array.isArray(val)) {
      return val.map(v => v.message)
    } else if (typeof val === 'string') {
      return val
    }
    return ''
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
