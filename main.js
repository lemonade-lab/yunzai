import { start } from "alemonjs";
import { dirname } from "path";
import { join } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const index = join(__dirname, "index.js");
const app = index
  .replace(/\\/g, "/")
  .replace(process.cwd().replace(/\\/g, "/"), "");
start(app);
