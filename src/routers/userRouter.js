import express from "express";
import {
  handleUseredit,
  handleUserremove,
  seeUser,
  logout,
} from "../controller/userController";
const Userrouter = express.Router();

Userrouter.get("/edit", handleUseredit);
Userrouter.get("/remove", handleUserremove);
Userrouter.get("/:id", seeUser);
Userrouter.get("/logout", logout);

export default Userrouter;
