import dotenv from "dotenv";

export const entorno = { mode: process.argv[2] };
if (
  (String(process.argv[2]) != "dev" && String(process.argv[2]) != "prod") ||
  process
) {
  //console.log("no esta bien el argumento, (dev or prod)");
  //console.log(process.argv[2]);
  process.exit;
}
dotenv.config({
  path:
    String(process.argv[2]) === "dev"
      ? "./.env.development"
      : "./.env.production",
});
entorno.MONGO_URL = process.env.MONGO_URL;
entorno.PORT = process.env.PORT;
entorno.GOOGLE_EMAIL = process.env.GOOGLE_EMAIL;
entorno.GOOGLE_PASS = process.env.GOOGLE_PASS;
entorno.GITHUB_CLIENT = process.env.GITHUB_CLIENT;
entorno.GITHUB_PASSWORD = process.env.GITHUB_PASSWORD;
