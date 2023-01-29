import express from "express";
import {
  Useredit,
  seeUser,
  logout,
  loginGithub,
  finishGithub,
  loginKakao,
  finishKakao,
} from "../controller/userController";
const Userrouter = express.Router();

Userrouter.get("/edit", Useredit);
Userrouter.get("/logout", logout);
Userrouter.get("/startGH", loginGithub);
Userrouter.get("/finishGH", finishGithub);
Userrouter.get("/kakaostart", loginKakao);
Userrouter.get("/kakaofinish", finishKakao);
Userrouter.get("/:id(\\d+)", seeUser);

export default Userrouter;
