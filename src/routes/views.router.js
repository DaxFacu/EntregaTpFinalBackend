import express from "express";
import { ProductManager } from "../ProductManager.js";
import { ProductModel } from "../DAO/mongo/models/products.model.js";
import { checkAdmin } from "../middlewares/auth.js";

import { cartsService } from "../services/carts.service.js";
import { checkUserCart } from "../middlewares/auth.js";

const productManager = new ProductManager("Products.json");

export const viewsRouter = express.Router();

viewsRouter.use(express.json());
viewsRouter.use(express.urlencoded({ extended: true }));

viewsRouter.get("/", (req, res) => {
  let products = productManager.getProducts();
  res.render("login-form");
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

viewsRouter.get("/login", async (req, res) => {
  res.render("login-form");
});

viewsRouter.get("/register", async (req, res) => {
  res.render("register-form");
});

viewsRouter.get("/profile", (req, res) => {
  const userName = req.user.firstName;
  const userLastName = req.user.lastName;
  const userMail = req.user.email;
  const userRol = req.user.rol;

  res.render("profile", { userName, userLastName, userMail, userRol });
});

//Products views
viewsRouter.get("/products", async (req, res) => {
  try {
    const { page, limit, category, status, sort } = req.query;
    const user = [
      req.user._id,
      req.user.email,
      req.user.firstName,
      req.user.lastName,
      req.user.rol,
    ];

    const userName = req.user.firstName;
    const userLastName = req.user.lastName;
    const userMail = req.user.email;
    const userRol = req.user.rol;
    const userCart = req.user.cart;

    var querySelect = undefined;
    if (category) {
      querySelect = { category: category };
    } else if (status) {
      querySelect = { status: status };
    } else {
      querySelect = undefined;
    }
    const products = await ProductModel.paginate(
      { ...querySelect },
      {
        limit: limit || 10,
        page: page || 1,
        sort: { price: sort },
      }
    );
    let product = products.docs.map((product) => {
      return {
        title: product.title,
        description: product.description,
        stock: product.stock,
        price: product.price,
        id: product._id,
      };
    });

    res.render("products", {
      status: "success",
      userName: userName,
      userLastName: userLastName,
      userMail: userMail,
      userRol: userRol,
      userCart: userCart,
      product: product,
      pagingCounter: products.pagingCounter,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

//Cart view

viewsRouter.get("/cart/:id", checkUserCart, async (req, res) => {
  try {
    const { id } = req.params;

    const user = [
      req.user._id,
      req.user.email,
      req.user.firstName,
      req.user.lastName,
      req.user.rol,
      req.user.cart,
    ];

    const userName = req.user.firstName;
    const userLastName = req.user.lastName;
    const userMail = req.user.email;
    const userRol = req.user.rol;
    const userCart = req.user.cart;

    const products = await cartsService.findCart(id);

    let product = products.products.map((product) => {
      return {
        title: product.product.title,
        description: product.product.description,
        stock: product.product.stock,
        price: product.product.price,
        id: product.product._id,
        quantity: product.quantity,
      };
    });

    res.render("carts", {
      status: "success",
      userName: userName,
      userLastName: userLastName,
      userMail: userMail,
      userRol: userRol,
      userCart: userCart,
      product: product,
      pagingCounter: products.pagingCounter,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

//Purchase view
viewsRouter.get("/:cid/purchase", async (req, res) => {
  try {
    const { cid } = req.params;

    const user = [
      req.user._id,
      req.user.email,
      req.user.firstName,
      req.user.lastName,
      req.user.rol,
      req.user.cart,
    ];

    const userName = req.user.firstName;
    const userLastName = req.user.lastName;
    const userMail = req.user.email;

    const ticket = await cartsService.purchase(cid, userMail);

    const products = await cartsService.findCart(cid);

    const ticketNumber = ticket.code;
    let product = products.products.map((product) => {
      return {
        title: product.product.title,
        description: product.product.description,
        stock: product.product.stock,
        price: product.product.price,
        id: product.product._id,
        quantity: product.quantity,
      };
    });

    //console.log(product);

    res.render("purchase", {
      status: "success",
      userName: userName,
      userLastName: userLastName,
      userMail: userMail,
      product: product,
      ticketNumber: ticketNumber,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

viewsRouter.get("/faillogin", async (req, res) => {
  return res.render("error-page", {
    msg: "No se pudo iniciar sesion",
    link: "/login",
    textLink: "Volver al login",
  });
});

viewsRouter.get("/failregister", async (req, res) => {
  return res.render("error-page", {
    msg: "No se pudo registrar",
    link: "/register",
    textLink: "Volver al registro",
  });
});

viewsRouter.get("/paneladmin", checkAdmin, (req, res) => {
  res.send("Panel ADMIN");
});
