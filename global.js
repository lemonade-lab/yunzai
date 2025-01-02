import { mkdirSync } from "fs";
/**
 * ********
 * 必要目录
 * ********
 */
mkdirSync("./temp/html", { recursive: true });
mkdirSync("./resources", { recursive: true });
mkdirSync("./data", { recursive: true });
/**
 * *********
 * 必要存储
 * *********
 */
global.NoteCookie = {};
global.BotConfig = {};
/**
 * *******
 * icqq
 * *******
 */
global.Bot = {
  uin: "self_id",
  logger: global.logger,
  makeForwardMsg: (val) => "",
  pickUser: (uid) => {
    return {
      sendMsg: (val) => "",
    };
  },
  nickname: "",
  getGroupMemberInfo: (val1, val2) => {
    return {
      card: "",
      nickname: "",
    };
  },
  fl: {
    get: (val) => "",
  },
  gl: {
    get: (val) => "",
  },
};
global.Bot["self_id"] = global.Bot;
