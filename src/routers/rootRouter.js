import express from "express";
import { home, search } from "../controller/videoController";
import {
  getJoin,
  postJoin,
  getlogin,
  postlogin,
} from "../controller/userController";
import { PublicMiddleware } from "../middleware";
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(PublicMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(PublicMiddleware).get(getlogin).post(postlogin);
rootRouter.get("/search", search);

export default rootRouter;
