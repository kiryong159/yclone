import express from "express";
import {
  Useredit,
  seeUser,
  logout,
  loginGithub,
  finishGithub,
  loginKakao,
} from "../controller/userController";
const Userrouter = express.Router();

Userrouter.get("/edit", Useredit);
Userrouter.get("/logout", logout);
Userrouter.get("/startGH", loginGithub);
Userrouter.get("/finishGH", finishGithub);
Userrouter.get("/kakakostart", loginKakao);
Userrouter.get("/:id(\\d+)", seeUser);

export default Userrouter;
