import { Yunzai } from './yunzai.js'
export default OnMiddleware(
  (event, next) => {
    Yunzai(event)
    next()
  },
  ['message.create', 'private.message.create']
)
