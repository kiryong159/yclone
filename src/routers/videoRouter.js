import express from "express";
import {
  watchVideo,
  VideoGetEdit,
  deleteVideo,
  upload,
  VideoPostEdit,
} from "../controller/videoController";
const Videorouter = express.Router();

Videorouter.get("/:idpotato(\\d+)", watchVideo);
Videorouter.route("/:id(\\d+)/edit").get(VideoGetEdit).post(VideoPostEdit);

// Videorouter.get("/upload", upload);
// Videorouter.get("/:id(\\d+)/delete", deleteVideo);

export default Videorouter;
