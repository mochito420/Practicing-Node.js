import { readData, writeData } from "../utils/json-controller.js";

export class UsersModel {
  static async createUsers({ input }) {
    const altuasData = await readData();

    if (altuasData.users.some((user) => user.username === input.username)) {
      throw new Error("this username alredy exist");
    }

    if (altuasData.users) {
      altuasData.users.push({
        fullname: input.fullname,
        username: input.username,
        password: input.password,
        id: altuasData.users.length,
        createAdd: new Date().toISOString(),
      });

      await writeData(altuasData);
    }
    return { input };
  }
}

