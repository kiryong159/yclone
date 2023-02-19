import express from "express";
import {
  getUseredit,
  postUseredit,
  seeUser,
  logout,
  loginGithub,
  finishGithub,
  loginKakao,
  finishKakao,
  getChangePW,
  postChangePW,
} from "../controller/userController";
import {
  ProtectMiddleware,
  PublicMiddleware,
  avatarUploadMiddleware,
  avatardeleteMiddleware,
} from "../middleware";
const Userrouter = express.Router();

Userrouter.route("/edit")
  .all(ProtectMiddleware)
  .get(getUseredit)
  .post(
    avatarUploadMiddleware.single("avatar"),
    avatardeleteMiddleware,
    postUseredit
  );
Userrouter.get("/logout", ProtectMiddleware, logout);
Userrouter.get("/startGH", PublicMiddleware, loginGithub);
Userrouter.get("/finishGH", PublicMiddleware, finishGithub);
Userrouter.get("/kakaostart", PublicMiddleware, loginKakao);
Userrouter.get("/kakaofinish", PublicMiddleware, finishKakao);
Userrouter.route("/changepw")
  .all(ProtectMiddleware)
  .get(getChangePW)
  .post(postChangePW);
Userrouter.get("/:id", seeUser);

export default Userrouter;
