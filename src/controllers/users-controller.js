import jwt from "jsonwebtoken";
import { UsersModel } from "../model/users-model.js";
import { jsonMiddelware } from "../utils/json-middelware.js";
import { parseCookie } from "../utils/cookie-parser.js";

export class UsersController {
  static async signupUser(req, res) {
    jsonMiddelware(req, res, async () => {
      const input = req.body;

      if (
        !input.hasOwnProperty("fullname") ||
        !input.hasOwnProperty("username") ||
        !input.hasOwnProperty("password")
      ) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "you have to fill the filds" }));
        return;
      }

      try {
        const newUser = await UsersModel.registerUser({ input });

        const token = jwt.sign({ userID: newUser.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.writeHead(201, {
          "content-type": "application/json",
          "Set-Cookie": `token=${token}; HttpOnly; Path=/`,
        });
        res.end(JSON.stringify({ message: "new user was created", newUser }));
      } catch (error) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: error.message }));
      }
    });
  }

  static async loginUser(req, res) {
    jsonMiddelware(req, res, async () => {
      const input = req.body;
      if (
        !input.hasOwnProperty("username") ||
        !input.hasOwnProperty("password")
      ) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "you have to fill the filds" }));
        return;
      }

      try {
        const logUser = await UsersModel.loginUser({ input });

        const token = jwt.sign({ userID: logUser.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.writeHead(201, {
          "content-type": "application/json",
          "Set-Cookie": `token=${token}; HttpOnly; Path=/`,
        });
        res.end(JSON.stringify({ message: "a user was loged", logUser }));
      } catch (error) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: error.message }));
      }
    });
  }

  static async userInfo(req, res) {
    const cookie = req.headers.cookie;
    const cookies = parseCookie(cookie);
    const token = cookies.token;

    if (!token) {
      res.writeHead(401, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Auth token not found" }));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userID = decoded.userID;

      const userInfo = await UsersModel.getUserInfo({ id: userID });

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "user was found", user: userInfo }));
    } catch (error) {
      res.writeHead(401, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid token" }));
    }
  }

  static async logoutUser(req, res) {
    const userLogout = UsersModel.logoutUser(req, res);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "user logout succesfully", user: userLogout })
    );
  }
}
