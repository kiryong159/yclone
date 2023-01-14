import express from "express";
import {
  seeVideo,
  handleVideoEdit,
  deleteVideo,
  upload,
} from "../controller/videoController";
const Videorouter = express.Router();

Videorouter.get("/upload", upload);
Videorouter.get("/:id", seeVideo);
Videorouter.get("/:id/edit", handleVideoEdit);
Videorouter.get("/:id/delete", deleteVideo);

export default Videorouter;
