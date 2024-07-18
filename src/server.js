import http from "http";
import { usersRouter } from "./routes/users-router.js";
import { signupRouter } from "./routes/signup-router.js";

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/users")) {
    usersRouter(req, res);
  } else if (req.url.startsWith("/signup") || req.method === "GET") {
    signupRouter(req, res);
  }
});

const port = 9000;

server.listen(port, () => {
  console.log(`server runing at http://localhost:${port}`);
});
