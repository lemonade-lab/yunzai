export default defineChildren(() => ({
  async onCreated() {
    await import('../../app.js')
    await import('./icqq/global.js')
    logger.info('[alemonjs&yunzai] start')
  }
}))
