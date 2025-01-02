import { useSend, OnMiddleware, Text, Image } from "alemonjs";
import Loader from "../../lib/plugins/loader.js";
/**
 * @param event
 */
const Yunzai = (event) => {
  const Send = useSend(event);
  const e = {
    user_id: event.UserId,
    message: [
      {
        type: "text",
        text: event.MessageText.replace(/(<|>)/g, ""),
      },
    ],
    reply: (content, _) => {
      console.log(content);
      if (Array.isArray(content)) {
        const image = content.filter((item) => item.type == "image");
        if (image.length > 0) {
          image.map((item) => Send(Image(item.file)));
        }
        const text = content
          .filter((item) => item.type == "text" || typeof item == "string")
          .map((item) => {
            // 变成字符串
            if (item.type == "text") {
              return item.text;
            }
            return item;
          })
          .join("");
        if (text && text != "") {
          Send(Text(text));
        }
      } else if (typeof content === "string") {
        Send(Text(content));
      } else if (content.type == "image") {
        Send(Image(content.file));
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
