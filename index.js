export default defineChildren(() => ({
  async onCreated() {
    await import("../app.js");
    await import("./global.js");
    console.log("alemonjs plugin created");
  },
}));
