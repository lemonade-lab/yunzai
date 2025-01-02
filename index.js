import "./../app.js";
export default defineChildren(() => ({
  onCreated() {
    console.log("alemonjs plugin created");
  },
}));
