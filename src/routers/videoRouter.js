import express from "express";
import {
  watchVideo,
  VideoGetEdit,
  VideoPostEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controller/videoController";
const Videorouter = express.Router();

Videorouter.get("/:idpotato([0-9a-f]{24})", watchVideo);
Videorouter.route("/:id([0-9a-f]{24})/edit")
  .get(VideoGetEdit)
  .post(VideoPostEdit);
Videorouter.route("/upload").get(getUpload).post(postUpload);
Videorouter.get(`/:id([0-9a-f]{24})/delete`, deleteVideo);
export default Videorouter;
