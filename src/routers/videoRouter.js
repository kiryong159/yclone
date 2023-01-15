import express from "express";
import {
  seeVideo,
  handleVideoEdit,
  deleteVideo,
  upload,
} from "../controller/videoController";
const Videorouter = express.Router();

Videorouter.get("/upload", upload);
Videorouter.get("/:id(\\d+)", seeVideo);
Videorouter.get("/:id(\\d+)/edit", handleVideoEdit);
Videorouter.get("/:id(\\d+)/delete", deleteVideo);

export default Videorouter;
