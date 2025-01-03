import {
  useSend,
  OnMiddleware,
  Text,
  Image,
  getConfigValue,
  Mention,
} from "alemonjs";
import Loader from "../../lib/plugins/loader.js";
async function streamToBuffer(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

/**
 * @param event
 */
const Yunzai = (event) => {
  const Send = useSend(event);
  let text = event.MessageText;
  // 去掉gui 的 # 扩展 <> 标签
  if (event.Platform == "gui") {
    text = event.MessageText.replace(/(<|>)/g, "");
  } else if (event.Platform == "qq") {
    // 如果启动的是icqq，使用传入原生消息
    const e = event.value;
    Loader.deal(e);
    return;
  }
  let value = getConfigValue();
  if (!value) value = {};
  const config = value[event.Platform];
  let keys = null;
  //
  if (config && config?.master_key && Array.isArray(config.master_key)) {
    keys = config.master_key;
  } else if (config && config?.master_id && Array.isArray(config.master_id)) {
    keys = config.master_id;
  }
  const e = {
    user_id: event.UserId,
    isMaster: keys ? keys.includes(event.UserId) : false,
    message: [
      {
        type: "text",
        text: text,
      },
    ],
    reply: (content, _) => {
      const isImage = (content) => {
        if (typeof content.file == "string") {
          // base65 变为 buffer
          Send(Image(Buffer.from(content.file, "base64")));
        } else if (Buffer.isBuffer(content.file)) {
          Send(Image(content.file));
        } else {
          streamToBuffer(content.file).then((buffer) => {
            Send(Image(buffer));
          });
        }
      };
      // console.log(content);
      if (Array.isArray(content)) {
        const image = content.filter((item) => item["type"] == "image");
        if (image.length > 0) {
          image.map((item) => isImage(item));
        }
        const datas = content
          .filter(
            (item) =>
              item.type == "text" ||
              typeof item == "string" ||
              item.type == "at"
          )
          .map((item) => {
            if (typeof item == "string") {
              return Text(item);
            } else if (item.type == "at") {
              if (item.qq == "all") {
                return Mention();
              } else {
                return Mention(String(item.qq));
              }
            } else if (item.type == "text") {
              return Text(item.text);
            }
            return Text("");
          });
        Send(...datas);
      } else if (typeof content === "string") {
        Send(Text(content));
      } else if (content.type == "image") {
        isImage(content);
      } else if (content.type == "text") {
        Send(Text(content.text));
      }
      // Send(Text(msg))
      const val = {
        message_id: event.MessageId,
      };
      return Promise.resolve(val);
    },
  };
  e["post_type"] = "message";
  if (event.name == "message.create") {
    e["message_type"] = "group";
    e["sub_type"] = "group";
    e["group_id"] = event.ChannelId;
  } else {
    e["message_type"] = "private";
    e["sub_type"] = "friend";
  }
  e["self_id"] = "self_id";
  Loader.deal(e);
};

export default OnMiddleware(
  (event, next) => {
    Yunzai(event);
    next();
  },
  ["message.create", "private.message.create"]
);
