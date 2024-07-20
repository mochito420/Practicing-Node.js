import url from "url";
import { UsersController } from "../controllers/users-controller.js";

export function usersRouter(req, res) {
  const reqPath = url.parse(req.url, true).pathname;
  const reqMethod = req.method;

  if (reqPath === "/api/users" && reqMethod === "GET") {
    UsersController.getAllUsers(req, res);
  } else if (reqPath === "/api/users" && reqMethod === "POST") {
    UsersController.signupUsers(req, res);
  } 
}
