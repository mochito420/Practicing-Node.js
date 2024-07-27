import { checkDatabase, updateDatabase } from "../utils/json-controller.js";
import { v4 as uuidv4 } from "uuid";
import bcry from "bcrypt";

export class UsersModel {
  static async registerUser({ input }) {
    const dataBase = await checkDatabase();

    if (dataBase.users.some((user) => user.username === input.username)) {
      throw new Error("this username alredy exist");
    }

    if (
      input.username === "" ||
      input.fullname === "" ||
      input.password === ""
    ) {
      throw new Error("inputs are empty");
    }

    if (input.password.length < 6) {
      throw new Error("password to short");
    }

    if (input.username.includes(" ")) {
      throw new Error("username should not have spaces");
    }

    const profilePic = "https://avatar.iran.liara.run/public";

    if (dataBase.users) {
      const saltRounds = 10;
      const hashedPassword = await bcry.hash(input.password, saltRounds);

      const newUser = {
        fullname: input.fullname,
        username: input.username,
        password: hashedPassword,
        id: uuidv4(),
        createAdd: new Date().toISOString().split("T")[0],
        profilepic: profilePic,
      };

      dataBase.users.push(newUser);
      await updateDatabase(dataBase);

      return newUser;
    }
  }

  static async loginUser({ input }) {
    const dataBase = await checkDatabase();

    if (dataBase.users) {
      const matchUser = dataBase.users.find(
        (user) => user.username === input.username
      );

      if (!matchUser) {
        throw new Error("invalid username");
      }

      const matchPassword = await bcry.compare(
        input.password,
        matchUser.password
      );

      if (!matchPassword) {
        throw new Error("invalid password");
      }
      
      return matchUser;
    }
  }

  static async getUserInfo({ id }) {
    const dataBase = await checkDatabase();

    if (dataBase.users) {
      const userInfo = dataBase.users.find((user) => user.id === id);

      if (!userInfo) {
        return `user whit ID: ${id} was not found`;
      } else {
        return userInfo;
      }
    }
  }
}
