import express from "express";
import {
  seeVideo,
  VideoEdit,
  deleteVideo,
  upload,
} from "../controller/videoController";
const Videorouter = express.Router();

Videorouter.get("/upload", upload);
Videorouter.get("/:id(\\d+)", seeVideo);
Videorouter.get("/:id(\\d+)/edit", VideoEdit);
Videorouter.get("/:id(\\d+)/delete", deleteVideo);

export default Videorouter;
