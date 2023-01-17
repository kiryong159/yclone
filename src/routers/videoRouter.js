import express from "express";
import {
  watchVideo,
  VideoGetEdit,
  VideoPostEdit,
  getUpload,
  postUpload,
} from "../controller/videoController";
const Videorouter = express.Router();

Videorouter.get("/:idpotato(\\d+)", watchVideo);
Videorouter.route("/:id(\\d+)/edit").get(VideoGetEdit).post(VideoPostEdit);
Videorouter.route("/upload").get(getUpload).post(postUpload);

export default Videorouter;
