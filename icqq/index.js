// import { Client } from 'icqq'

//
export class Client {
  fl = new Map() // 好友列表
  sl = new Map() // 陌生人列表
  gl = new Map() // 群列表
  gml = new Map() // 群员列表缓存
  guilds = new Map() // 频道列表
  blacklist = new Set() // 黑名单列表
  classes = new Map() // 好友分组
  status = 'Online' // 在线状态
  nickname = '' // 昵称
  sex = 'Unknown' // 性别
  age = 0 // 年龄
  bid = '' // 未知属性
  stamp = new Set() // 漫游表情缓存
  tiny_id = '' // 相当于频道中的QQ号
  dir = '' // 账号本地数据存储目录
  logger = console // 简单的日志记录

  constructor(uin) {
    this.uin = uin
  }

  pickUser = uid => {
    return {
      sendMsg: val => ''
    }
  }

  // 得到一个群对象, 通常不会重复创建、调用
  pickGroup = (gid, strict = false) => {
    if (this.gl.has(gid)) {
      return this.gl.get(gid)
    } else if (strict) {
      throw new Error(`Group with ID ${gid} does not exist.`)
    }
    // 创建并返回新的 Group 对象
    // const newGroup = new Group(gid)
    // this.gl.set(gid, newGroup)
    return {
      // 发送消息
      sendMsg: val => '',
      // 退出群聊
      quit: () => {},
      // 踢人
      pokeMember: uid => {}
    }
  }

  // 得到一个好友对象, 通常不会重复创建、调用
  pickFriend = (uid, strict = false) => {
    if (this.fl.has(uid)) {
      return this.fl.get(uid)
    } else if (strict) {
      throw new Error(`Friend with ID ${uid} does not exist.`)
    }
    // 创建并返回新的 Friend 对象
    // const newFriend = new Friend(uid)
    // this.fl.set(uid, newFriend)
    return {}
  }

  // 得到一个群员对象, 通常不会重复创建、调用
  pickMember = (gid, uid, strict = false) => {
    const groupMembers = this.gml.get(gid) || new Map()
    if (groupMembers.has(uid)) {
      return groupMembers.get(uid)
    } else if (strict) {
      throw new Error(`Member with ID ${uid} does not exist in group ${gid}.`)
    }
    // 创建并返回新的 Member 对象
    // const newMember = new Member(uid, gid)
    // groupMembers.set(uid, newMember)
    // this.gml.set(gid, groupMembers)
    return {}
  }

  // 创建一个讨论组对象
  pickDiscuss = gid => {
    return {}
  }

  // 创建一个频道对象，通常不会重复创建、调用
  pickGuild = guild_id => {
    // if (this.guilds.has(guild_id)) {
    //   return this.guilds.get(guild_id)
    // }
    // // 创建并返回新的 Guild 对象
    // const newGuild = new Guild(guild_id)
    // this.guilds.set(guild_id, newGuild)
    // return newGuild

    return {
      sendMsg: val => ''
    }
  }

  /** 修改日志级别 */
  set log_level(level) {
    // this.logger.level = level // 假设 logger 有 level 属性
  }

  async login(uin, password) {
    // 登录逻辑
  }

  /** 设置在线状态 */
  async setOnlineStatus(status) {
    this.status = status
    return true
  }

  /** 设置昵称 */
  async setNickname(nickname) {
    this.nickname = nickname
    return true
  }

  /** 设置性别 */
  async setGender(gender) {
    this.sex = gender
    return true
  }

  /** 设置生日 */
  async setBirthday(birthday) {
    // this.age = this._parseBirthday(birthday)
    return true
  }

  /** 设置个人说明 */
  async setDescription(description) {
    // 设置说明逻辑
    return true
  }

  /** 设置个性签名 */
  async setSignature(signature) {
    // 设置签名逻辑
    return true
  }

  /** 获取个性签名 */
  async getSignature() {
    // 返回个性签名逻辑
    return 'Sample Signature'
  }

  /** 设置头像 */
  async setAvatar(file) {
    // 设置头像逻辑
  }

  /** 获取漫游表情 */
  async getRoamingStamp(no_cache = false) {
    // 获取漫游表情逻辑
    return []
  }

  /** 删除表情(支持批量) */
  async deleteStamp(id) {
    // 删除表情逻辑
  }

  /** 获取系统消息 */
  async getSystemMsg() {
    // 获取系统消息逻辑
    return []
  }

  /** 添加好友分组 */
  async addClass(name) {
    this.classes.set(name, [])
    return
  }

  /** 删除好友分组 */
  async deleteClass(id) {
    this.classes.delete(id)
    return
  }

  /** 重命名好友分组 */
  async renameClass(id, name) {
    // 重命名逻辑
  }

  /** 重载好友列表 */
  async reloadFriendList() {
    // 重载好友列表逻辑
  }

  /** 重载陌生人列表 */
  async reloadStrangerList() {
    // 重载陌生人列表逻辑
  }

  /** 重新加载频道列表 */
  async reloadGuilds() {
    // 重载频道列表逻辑
  }

  /** 重载群列表 */
  async reloadGroupList() {
    // 重载群列表逻辑
  }

  /** 重载黑名单 */
  async reloadBlackList() {
    // 重载黑名单逻辑
  }

  /** 清空缓存文件 */
  cleanCache() {
    // 清空缓存逻辑
  }

  /** 获取视频下载地址 */
  async getVideoUrl(fid, md5) {
    // 获取视频下载地址逻辑
    return 'video_url'
  }

  /** 获取转发消息 */
  async getForwardMsg(resid, fileName, nt) {
    // 获取转发消息逻辑
    return []
  }

  /** 制作转发消息 */
  async makeForwardMsg(fake, dm, nt) {
    const getText = val => {
      if (Array.isArray(val)) {
        const str = val.map(v => v.message)
        return str.join('\n')
      } else if (typeof val === 'string') {
        return val
      }
      return ''
    }
    const text = getText(fake)
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
  }

  /** Ocr图片转文字 */
  async imageOcr(file) {
    // 处理OCR逻辑
    return {}
  }

  /** 获取Cookies */
  getCookies(domain) {
    // 获取Cookies逻辑
    return 'cookies'
  }

  /** 获取Csrf Token */
  getCsrfToken() {
    // 获取CSRF Token逻辑
    return 123456
  }

  /** 获取好友列表 */
  getFriendList() {
    // return this.fl
    return []
  }

  /** 获取群列表 */
  getGroupList() {
    // return this.gl
    return []
  }

  /** 获取频道列表 */
  getGuildList() {
    return Array.from(this.guilds.values())
  }

  /** 获取频道信息 */
  getGuildInfo(guild_id) {
    return this.guilds.get(guild_id) || null
  }

  /** 获取子频道列表 */
  getChannelList(guild_id) {
    // 获取子频道列表逻辑
    return []
  }

  /** 获取频道成员列表 */
  async getGuildMemberList(guild_id) {
    // 获取频道成员列表逻辑
    return []
  }

  /** 获取陌生人列表 */
  getStrangerList() {
    return this.sl
  }

  /** 获取陌生人信息 */
  async getStrangerInfo(user_id) {
    // 获取陌生人信息逻辑
    return {
      user_id,
      nickname: 'Sample',
      sex: 'Unknown',
      age: 0,
      area: 'Unknown'
    }
  }

  /** 获取群信息 */
  async getGroupInfo(group_id, no_cache) {
    return this.gl.get(group_id) || null
  }

  /** 获取群员列表 */
  async getGroupMemberList(group_id, no_cache) {
    return this.gml.get(group_id) || new Map()
  }

  /** 获取群员信息 */
  async getGroupMemberInfo(group_id, user_id, no_cache) {
    // return this.gml.get(group_id)?.get(user_id) || {}
    return {
      card: '',
      nickname: ''
    }
  }

  /** 发送私信 */
  async sendPrivateMsg(user_id, message, source) {
    // 发送私信逻辑
    return {}
  }

  /** 发送群消息 */
  async sendGroupMsg(group_id, message, source) {
    // 发送群消息逻辑
    return {}
  }

  /** 发送临时消息 */
  async sendTempMsg(group_id, user_id, message) {
    // 发送临时消息逻辑
    return {}
  }

  /** 删除消息 */
  async deleteMsg(message_id) {
    // 删除消息逻辑
    return true
  }

  /** 标记消息为已读 */
  async reportReaded(message_id) {
    // 标记为已读逻辑
  }

  /** 获取消息 */
  async getMsg(message_id) {
    // 获取消息逻辑
    return {}
  }

  /** 获取聊天记录 */
  async getChatHistory(message_id, count) {
    // 获取聊天记录逻辑
    return []
  }

  /** 设置群成员消息屏蔽状态 */
  async setGroupMemberScreenMsg(group_id, member_id, isScreen = true) {
    // 设置消息屏蔽逻辑
    return true
  }

  /** 设置群名称 */
  async setGroupName(group_id, name) {
    // 设置群名称逻辑
    return true
  }

  /** 发送群公告 */
  async sendGroupNotice(group_id, content) {
    // 发送群公告逻辑
    return true
  }

  /** 设置群管理员 */
  async setGroupAdmin(group_id, user_id, enable = true) {
    // 设置群管理员逻辑
    return true
  }

  /** 设置群成员特殊称号 */
  async setGroupSpecialTitle(group_id, user_id, special_title, duration) {
    // 设置特殊称号逻辑
    return true
  }

  /** 设置群名片 */
  async setGroupCard(group_id, user_id, card) {
    // 设置群名片逻辑
    return true
  }

  /** 群踢人 */
  async setGroupKick(group_id, user_id, reject_add_request = false, message) {
    // 群踢人逻辑
    return true
  }

  /** 群禁言 */
  async setGroupBan(group_id, user_id, duration) {
    // 群禁言逻辑
  }

  /** 退出群 */
  async setGroupLeave(group_id) {
    // 退出群逻辑
    return true
  }

  /** 群戳一戳 */
  async sendGroupPoke(group_id, user_id) {
    // 群戳一戳逻辑
    return true
  }

  /** 添加好友 */
  async addFriend(group_id, user_id, comment) {
    // 添加好友逻辑
    return true
  }

  /** 删除好友 */
  async deleteFriend(user_id, block = false) {
    // 删除好友逻辑
    return true
  }

  /** 邀请好友入群 */
  async inviteFriend(group_id, user_id) {
    // 邀请好友入群逻辑
    return true
  }

  /** 点赞 */
  async sendLike(user_id, times = 1) {
    // 点赞逻辑
    return true
  }

  /** 设置头像 */
  async setPortrait(file) {
    return this.setAvatar(file)
  }

  /** 设置群头像 */
  async setGroupPortrait(group_id, file) {
    // 设置群头像逻辑
  }

  /** 获取GFS */
  async acquireGfs(group_id) {
    // 获取GFS逻辑
    return {}
  }

  /** 设置好友添加请求 */
  async setFriendAddRequest(flag, approve = true, remark, block = false) {
    // 设置好友添加请求逻辑
    return true
  }

  /** 设置群邀请请求 */
  async setGroupAddRequest(flag, approve = true, reason, block = false) {
    // 设置群邀请请求逻辑
    return true
  }

  /** 监听群消息事件 */
  group(...group_ids) {
    return listener => {
      // 事件监听逻辑
    }
  }

  /** 监听用户私聊事件 */
  user(...user_ids) {
    return listener => {
      // 事件监听逻辑
    }
  }

  /** 发出事件 */
  em(name, data) {
    // 事件发出逻辑
  }

  /** 检查消息是否存在 */
  _msgExists(from, type, seq, time) {
    // 检查消息逻辑
    return false
  }

  /** 计算每分钟消息数量 */
  _calcMsgCntPerMin() {
    // 计算逻辑
    return 0
  }

  /** 设置用户资料 */
  _setProfile() {
    // 设置用户资料逻辑
  }

  /** 滑动登录（废弃） */
  async sliderLogin(ticket) {
    // 滑动登录逻辑
  }

  /** 发送短信验证码（废弃） */
  async sendSMSCode() {
    // 发送短信验证码逻辑
  }

  /** 提交短信验证码（废弃） */
  async submitSMSCode(code) {
    // 提交短信验证码逻辑
  }

  /** 获取在线状态（废弃） */
  get online_status() {
    return this.status
  }
}
