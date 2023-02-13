import express from "express";
import { ids } from "webpack";
import {
  registerView,
  createComment,
  CommentDelete,
  postcommentEdit,
} from "../controller/videoController";

const apiRouter = express.Router();

apiRouter.post("/video/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/video/:id([0-9a-f]{24})/comment", createComment);
apiRouter.delete("/video/:id([0-9a-f]{24})/comment/delete", CommentDelete);
apiRouter.post("/comment/:id([0-9a-f]{24})/edit", postcommentEdit);
export default apiRouter;
