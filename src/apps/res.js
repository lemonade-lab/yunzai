import { Text, useSend } from 'alemonjs'
export const regular = /^(#|\/)?isyunzai$/
export default OnResponse((event) => {
    const Send = useSend(event)
    Send(Text('yes'))
}, 'message.create')