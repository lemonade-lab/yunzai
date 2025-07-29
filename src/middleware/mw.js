import { Yunzai } from './yunzai.js'
const selects = onSelects(['message.create', 'private.message.create'])
export default onMiddleware(selects, (event, next) => {
  Yunzai(event)
  next()
})
