import express from "express";
import {
  Useredit,
  Userremove,
  seeUser,
  logout,
  loginGithub,
  finishGithub,
} from "../controller/userController";
const Userrouter = express.Router();

Userrouter.get("/edit", Useredit);
Userrouter.get("/remove", Userremove);
Userrouter.get("/logout", logout);
Userrouter.get("/startGH", loginGithub);
Userrouter.get("/finishGH", finishGithub);
Userrouter.get("/:id(\\d+)", seeUser);

export default Userrouter;
