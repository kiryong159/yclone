import express from "express";
const Videorouter = express.Router();

const videowatch = (req, res) => res.send("watch");
const videodelete = (req, res) => res.send("videodelete");

Videorouter.get("/watch", videowatch);
Videorouter.get("/delete", videodelete);

export default Videorouter;
