//@ts-check
import express from "express";
import { usersController } from "../controllers/users.controller.js";
export const routerUsers = express.Router();

routerUsers.get("/", usersController.getAllUsers);

routerUsers.post("/", usersController.createUser);

routerUsers.put("/:id", usersController.updateUser);

routerUsers.delete("/id", usersController.deleteUser);

routerUsers.delete("/", usersController.deleteInactiveUser);
