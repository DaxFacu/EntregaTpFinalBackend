import nodemailer from "nodemailer";
import { __dirname } from "./utils.js";
import dotenv from "dotenv";
import { entorno } from "../config/config.js";
dotenv.config();

//Mail
const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: entorno.GOOGLE_EMAIL,
    pass: entorno.GOOGLE_PASS,
  },
});

async function sendMail(email) {
  await transport.sendMail({
    from: entorno.GOOGLE_EMAIL,
    to: email,
    subject: "Cuenta Eliminada",
    html: `
              <div>
                  <h1>Cuenta Eliminada</h1>
                  <p>Su cuenta fue eliminada por inactividad</p>
              </div>
          `,
    /* attachments: [
      {
        //filename: "image1.gif",
       // path: __dirname + "/images/image1.gif",
       // cid: "image1",
      },
    ],*/
  });
}

export default sendMail;
