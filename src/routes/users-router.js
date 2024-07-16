import url from "url";
import { UsersController } from "../controllers/users-controller.js";

export function usersRouter(req, res) {
  const reqPath = url.parse(req.url, true).pathname;
  const reqMethod = req.method;

  if (reqPath === "/users" && reqMethod === "GET") {
    UsersController.getAllUsers(req, res);
  } else if (reqPath === "/users" && reqMethod === "POST") {
    UsersController.createUsers(req, res);
  } 
}
