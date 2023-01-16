import express from "express";
import {
  watchVideo,
  VideoEdit,
  deleteVideo,
  upload,
} from "../controller/videoController";
const Videorouter = express.Router();

Videorouter.get("/upload", upload);
Videorouter.get("/:id(\\d+)", watchVideo);
Videorouter.get("/:id(\\d+)/edit", VideoEdit);
Videorouter.get("/:id(\\d+)/delete", deleteVideo);

export default Videorouter;
