import express from "express";
import { home, search } from "../controller/videoController";
import {
  getJoin,
  postJoin,
  getlogin,
  postlogin,
} from "../controller/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getlogin).post(postlogin);
rootRouter.get("/search", search);

export default rootRouter;
