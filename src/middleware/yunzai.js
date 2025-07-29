import {
  Text,
  Image,
  getConfigValue,
  format,
  Mention,
  useMessage
} from 'alemonjs'
import Loader from '../../../lib/plugins/loader.js'
import { streamToBuffer } from './util.js'
import { useMention } from 'alemonjs'

const useMentionsUsers = async event => {
  const [mention] = useMention(event)
  const users = await mention.find({ IsBot: false })
  return users
}

/**
 * @param event
 */
export const Yunzai = async event => {
  const [message] = useMessage(event)

  let text = event.MessageText

  let value = getConfigValue()
  if (!value) value = {}
  const config = value[event.Platform]

  let isMaster = false
  //
  if (config && config?.master_key && Array.isArray(config.master_key)) {
    if (config.master_key.includes(event.UserKey)) isMaster = true
  }

  if (config && config?.master_id && Array.isArray(config.master_id)) {
    if (config.master_id.includes(event.UserId)) isMaster = true
  }

  // 去掉gui 的 # 扩展 <> 标签
  if (event.Platform == 'gui') {
    text = event.MessageText.replace(/<#(.*?)>/g, '#$1')
  } else if (event.Platform == 'qq') {
    // 如果启动的是icqq，使用传入原生消息
    const e = event.value
    e['isMaster'] = isMaster
    Loader.deal(e)
    return
  }

  const users = await useMentionsUsers(event)

  const msgs = [
    {
      type: 'text',
      text: text
    }
  ]

  if (users && users.length > 0) {
    users.forEach(item =>
      msgs.push({
        type: 'at',
        id: item.UserId,
        qq: item.UserId
      })
    )
  }

  const e = {
    user_id: event.UserId,
    isMaster: isMaster,
    message: msgs,
    post_type: 'message',
    reply: (content, _) => {
      const isImage = content => {
        if (typeof content.file == 'string') {
          // base65 变为 buffer
          message.send(format(Image(Buffer.from(content.file, 'base64'))))
        } else if (Buffer.isBuffer(content.file)) {
          message.send(format(Image(content.file)))
        } else {
          streamToBuffer(content.file).then(buffer => {
            message.send(format(Image(buffer)))
          })
        }
      }
      if (Array.isArray(content)) {
        const image = content.filter(item => item['type'] == 'image')
        if (image.length > 0) {
          image.map(item => isImage(item))
        }
        const datas = content
          .filter(
            item =>
              item.type == 'text' ||
              typeof item == 'string' ||
              item.type == 'at'
          )
          .map(item => {
            if (typeof item == 'string') {
              return Text(item)
            } else if (item.type == 'at') {
              if (item.qq == 'all') {
                return Mention()
              } else {
                return Mention(String(item.qq))
              }
            } else if (item.type == 'text') {
              return Text(item.text)
            }
            return Text('')
          })
        message.send(format(...datas))
      } else if (typeof content === 'string') {
        message.send(format(Text(content)))
      } else if (content.type == 'image') {
        isImage(content)
      } else if (content.type == 'text') {
        message.send(format(Text(content.text)))
      }
      const val = {
        message_id: event.MessageId
      }
      return Promise.resolve(val)
    }
  }
  if (event.name == 'message.create') {
    e['message_type'] = 'group'
    e['sub_type'] = 'group'
    e['group_id'] = event.ChannelId
    e['group_name'] = ''
  } else {
    e['message_type'] = 'private'
    e['sub_type'] = 'friend'
  }
  e['self_id'] = 'self_id'
  Loader.deal(e)
}
