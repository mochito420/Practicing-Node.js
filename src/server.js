import http from "http";
import { usersRouter } from "./routes/users-router.js";
import { signupRouter } from "./routes/signup-router.js";
import { loginRouter } from "./routes/login-router.js";
import { profileRouter } from "./routes/profile-router.js";
import { FileHandler } from "./utils/file-handler.js";

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/api/users")) {
    usersRouter(req, res);
  } else if (req.url.startsWith("/signup")) {
    signupRouter(req, res);
  } else if (req.url.startsWith("/login")) {
    loginRouter(req, res);
  } else if (req.url.startsWith("/profile")) {
    profileRouter(req, res);
  } else {
    FileHandler.serveStaticFile(req, res);
  }
});

const port = 9000;

server.listen(port, () => {
  console.log(`server runing at http://localhost:${port}`);
});
