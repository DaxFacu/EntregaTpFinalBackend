import { Schema, model } from "mongoose";

const schema = new Schema({
  id: {
    type: String,
    max: 100,
  },
  code: {
    type: String,
    unique: true,
  },
  purchase_datatime: {
    type: String,
  },
  amount: {
    type: String,
    required: true,
  },

  purchaser: {
    type: String,
  },
});

export const TicketModel = model("ticket", schema);
