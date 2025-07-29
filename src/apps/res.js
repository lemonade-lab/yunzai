import { Text, useMessage, format, onSelects } from 'alemonjs'
export const regular = /^(#|\/)?isYunzai$/
const selects = onSelects(['private.message.create'])
export default onResponse(selects, event => {
  const [message] = useMessage(event)
  message.send(format(Text('yes')))
})
