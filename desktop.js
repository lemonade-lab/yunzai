import { events } from '@alemonjs/process'

// @alemonjs/process 内部使用的消息处理函数
const send = data => {
  const message = {
    type: data.type,
    data: data.data,
    from: 'nodejs',
    timestamp: Date.now(),
    __STDIN_JSON_DATA: true
  }
  process.stdout.write(JSON.stringify(message) + '\n')
}

if (!global.wsprocess) {
  global.wsprocess = {}
}
global.wsprocess.send = send

// 监听 stdin 接收来自 Go 的消息
process.stdin.on('data', data => {
  try {
    const d = data.toString().trim()
    if (!d) return
    if (!/__STDIN_JSON_DATA/.test(d)) {
      // 非消息数据，忽略
      return
    }
    const message = JSON.parse(d)
    // 非法消息
    if (!message.type) return
    if (/webview-/.test(message.type)) {
      events[message.type](JSON.parse(message.data))
      return
    }
    events[message.type](message.data)
  } catch (error) {
    // 忽略非消息数据
  }
})

// 这是旧版本设计
// 主进程的通信，获取所有的模块。
process.on &&
  process.on('message', event => {
    if (events[event.type]) events[event.type](event.data)
  })
