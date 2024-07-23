import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import url from "url";
import mime from "mime-types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class FileHandler {
  static async serveStaticFile(req, res) {
    if (req.method === "GET") {
      const reqPath = url.parse(req.url, true).pathname;
      const filePath = path.join(__dirname, "../view", reqPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          console.log(err);
          return;
        }
        const fileType = mime.lookup(filePath);
        res.writeHead(200, { "content-type": fileType });
        res.end(data);
      });
    }
  }
}
