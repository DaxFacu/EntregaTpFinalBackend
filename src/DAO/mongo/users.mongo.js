import dateFns from "../../utils/date-fns.js";
import sendMail from "../../utils/mail.js";
import { UserModel } from "./models/users.model.js";
import axios from "axios";

class UsersMongo {
  constructor() {}

  getAllUsers = async () => {
    const users = await UserModel.find();
    return users;
  };

  createUser = async (firstName, lastName, email, cart) => {
    this.validatePostUser(firstName, lastName, email);

    const userCreated = await UserModel.create({
      firstName,
      lastName,
      email,
      cart,
    });

    return userCreated;
  };

  updateUser = async (id, firstName, lastName, email, cart) => {
    this.validatePostUser(id, firstName, lastName, email);
    const userUptaded = await UserModel.updateOne(
      { _id: id },
      { firstName, lastName, email, cart }
    );
    return userUptaded;
  };

  updateDateUser = async (id, loginDate) => {
    const userUptaded = await UserModel.updateOne({ _id: id }, { loginDate });
    return userUptaded;
  };

  deleteInactiveUser = async (date) => {
    const filtro = { loginDate: { $lte: date } };

    const usersInact = await UserModel.find({
      loginDate: { $lte: date },
    });

    const mailsUsersInact = usersInact.map((usuario) => usuario.email);

    //console.log(mailsUsersInact);

    for (let i = 0; i < mailsUsersInact.length; i++) {
      sendMail(mailsUsersInact[i]);
    }

    const userDeleted = await UserModel.deleteMany({
      loginDate: { $lte: date },
    });
    return userDeleted;
  };

  deleteUser = async (id) => {
    //this.validateId(id);
    const deleted = await UserModel.deleteOne({ _id: id });
    return deleted;
  };
}

export const UserMongo = new UsersMongo();
