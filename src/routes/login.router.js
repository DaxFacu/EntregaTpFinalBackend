import express from "express";
import usertDTO from "../DAO/DTO/user.dto.js";
import passport from "passport";
import { userService } from "../services/users.service.js";
import dateFormat from "../utils/date-fns.js";

export const loginRouter = express.Router();

loginRouter.get("/session", (req, res) => {
  return res.send(JSON.stringify(req.session));
});

loginRouter.get("/register", (req, res) => {
  return res.render("register", {});
});

loginRouter.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  (req, res) => {
    if (!req.user) {
      return res.status(400).render("error-page", {
        msg: "faltan datos",
        link: "/register",
        textLink: "Volver al registro",
      });
    }

    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      rol: req.user.rol,
      cart: req.user.cart,
    };

    return res.redirect("/products");
  }
);

loginRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    if (!req.user) {
      return res.json({ error: "invalid credentials" });
    }

    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      rol: req.user.rol,
    };

    const date = dateFormat.getDate();
    userService.updateDateLoginUser(req.user._id, date);
    return res.redirect("/products");
  }
);

loginRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render("error-page", {
        msg: "no se pudo cerrar la session",
        link: "/products",
        textLink: "Volver a productos",
      });
    }
    return res.redirect("/login");
  });
});

loginRouter.get("/current", async (req, res) => {
  const userReq = req.session.user;
  const user = await usertDTO.UsertDTO(req.user.firstName);
  return res.status(200).json({
    status: "success",
    msg: "datos de la session",
    payload: user || {},
  });
});
