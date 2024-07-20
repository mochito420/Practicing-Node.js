import { UsersModel } from "../model/users-model.js";
import { jsonMiddelware } from "../routes/json-middelware.js";

export class UsersController {
  static async signupUsers(req, res) {
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
        const newUser = await UsersModel.createUsers({ input });

        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "new user was created", newUser }));
      } catch (error) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({message: error.message}));
        console.log(error.message);
      }
    });
  }
}
