import express from "express";
import {
  watchVideo,
  VideoGetEdit,
  VideoPostEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controller/videoController";
import {
  ProtectMiddleware,
  videoUploadMiddleware,
  videodeleteMiddleware,
} from "../middleware";
const Videorouter = express.Router();

Videorouter.get("/:idpotato([0-9a-f]{24})", watchVideo);
Videorouter.route("/:id([0-9a-f]{24})/edit")
  .all(ProtectMiddleware)
  .get(VideoGetEdit)
  .post(VideoPostEdit);
Videorouter.route("/upload")
  .all(ProtectMiddleware)
  .get(getUpload)
  .post(
    videoUploadMiddleware.fields([{ name: "video" }, { name: "thumb" }]),
    postUpload
  );
Videorouter.route(`/:id([0-9a-f]{24})/delete`)
  .all(ProtectMiddleware, videodeleteMiddleware)
  .get(deleteVideo);
export default Videorouter;
