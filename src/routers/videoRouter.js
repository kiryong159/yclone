import express from "express";
import { handleWatch, handleVideoEdit } from "../controller/videoController";
const Videorouter = express.Router();

Videorouter.get("/watch", handleWatch);
Videorouter.get("/edit", handleVideoEdit);

export default Videorouter;
