export default defineChildren(() => ({
  async onCreated() {
    await import('../app.js')
    await import('./icqq/global.js')
    console.log('alemonjs plugin created')
  }
}))
