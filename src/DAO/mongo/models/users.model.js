//@ts-check
import { Schema, model } from "mongoose";
import monsoosePaginate from "mongoose-paginate-v2";
import getDate from "../../../utils/date-fns.js";

const schema = new Schema({
  firstName: {
    type: String,
    max: 100,
  },
  lastName: {
    type: String,
    max: 100,
  },
  password: {
    type: String,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 100,
    unique: true,
  },

  rol: {
    type: String,
  },
  age: {
    type: Number,
  },
  cart: {
    type: String,
  },
  loginDate: {
    type: String,
    default: getDate.getDate(),
  },
});
schema.plugin(monsoosePaginate);
export const UserModel = model("users3", schema);
