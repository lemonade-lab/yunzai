import { join } from "path";
import { createClient } from "redis";
import { readFileSync } from "fs";
import YAML from "yaml";
const dir = join(process.cwd(), "config", "config", "redis.yaml");
const data = readFileSync(dir, "utf8");
const RDB = YAML.parse(data);
async function redisInit() {
  const url = `${RDB?.host ?? "localhost"}:${RDB?.port ?? 6379}`;
  const client = createClient({
    url: `redis://:${RDB.password ?? ""}@${url}`,
  });
  await client.connect();
  await client.on("error", async (err) => {
    console.log("连接失败~", err);
    process.exit();
  });
  await client.select(RDB.db ?? 1);
  return client;
}
export const Redis = await redisInit();
