import http from "http";
import dotenv from "dotenv";
import { authMiddleware } from "./utils/auth-middelware.js";
import { usersRouter } from "./routes/users-router.js";
import { signupRouter } from "./routes/signup-router.js";
import { loginRouter } from "./routes/login-router.js";
import { profileRouter } from "./routes/profile-router.js";
import { FileHandler } from "./utils/file-handler.js";
dotenv.config()

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/api/users")) {
    usersRouter(req, res);
  } else if (req.url.startsWith("/signup")) {
    signupRouter(req, res);
  } else if (req.url.startsWith("/login")) {
    loginRouter(req, res);
  } else if (req.url.startsWith("/profile")) {
    authMiddleware(req, res, () => {
      profileRouter(req, res);
    });
  } else {
    FileHandler.serveStaticFile(req, res);
  }
});

const port = 9000;

server.listen(port, () => {
  console.log(`server runing at http://localhost:${port}`);
});
