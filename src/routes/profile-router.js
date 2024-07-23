import { FileHandler } from "../utils/file-handler.js";
import url from "url";

export function profileRouter(req, res) {
  const reqPath = url.parse(req.url, true).pathname;
  const reqMethod = req.method;

  if (reqPath.startsWith("/profile") && reqMethod === "GET") {
    req.url = "/index.html";
    FileHandler.serveStaticFile(req, res);
  } else if (reqMethod === "GET") {
    FileHandler.serveStaticFile(req, res);
  } else {
    res.writeHead(405);
    res.end("Method no allowed");
  }
}
