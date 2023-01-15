import express from "express";
import {
  Useredit,
  Userremove,
  seeUser,
  logout,
} from "../controller/userController";
const Userrouter = express.Router();

Userrouter.get("/edit", Useredit);
Userrouter.get("/remove", Userremove);
Userrouter.get("/logout", logout);
Userrouter.get("/:id(\\d+)", seeUser);

export default Userrouter;
