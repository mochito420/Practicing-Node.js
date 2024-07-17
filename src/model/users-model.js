import { readData, writeData } from "../utils/json-controller.js";
import { v4 as uuidv4 } from "uuid";
import bcry from "bcrypt";

export class UsersModel {
  static async createUsers({ input }) {
    const altuasData = await readData();

    if (altuasData.users.some((user) => user.username === input.username)) {
      throw new Error("this username alredy exist");
    }

    if (input.password.length < 6) {
      throw new Error("password has to be 6 or more characters");
    }

    if (input.username.includes(" ")) {
      throw new Error("username should not have spaces");
    }

    if (altuasData.users) {
      const saltRounds = 10;
      const hashedPassword = await bcry.hash(input.password, saltRounds);

      altuasData.users.push({
        fullname: input.fullname,
        username: input.username,
        password: hashedPassword,
        id: uuidv4(),
        createAdd: new Date().toISOString().split("T")[0],
      });

      await writeData(altuasData);
    }
    return { input };
  }
}
