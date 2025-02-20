import { Text, useSend } from 'alemonjs'
// 导出响应
export default OnResponse((event, next) => {
  // 创建接口
  const Send = useSend(event)
  // 发送文本
  Send(Text('hello'))
  // 事件类型
}, 'message.create')
