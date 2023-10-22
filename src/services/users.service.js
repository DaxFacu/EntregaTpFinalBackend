import { UserMongo } from "../DAO/mongo/users.mongo.js";
import dateFns from "../utils/date-fns.js";

class UserService {
  async getAllUsers() {
    const users = await UserMongo.getAllUsers();
    return users;
  }

  async createUser(firstName, lastName, email, cart) {
    this.validatePostUser(firstName, lastName, email);

    const userCreated = await UserModel.createUser({
      firstName,
      lastName,
      email,
      cart,
    });
    return userCreated;
  }
  async updateUser(id, firstName, lastName, email, cart) {
    this.validatePostUser(id, firstName, lastName, email);

    const userUptaded = await UserMongo.updateUser(
      { _id: id },
      { firstName, lastName, email, cart }
    );
    return userUptaded;
  }

  async updateDateLoginUser(id, date) {
    const userUptaded = await UserMongo.updateDateUser(id, date);
    return userUptaded;
  }

  async deleteUser(id) {
    const deleted = await UserMongo.deleteUser({ _id: id });
    return deleted;
  }

  async deleteInactiveUser() {
    const date = dateFns.dateAntFormat;
    //const date = dateFns.getDate();

    const deleted = await UserMongo.deleteInactiveUser(date);
    return deleted;
  }
}

export const userService = new UserService();
