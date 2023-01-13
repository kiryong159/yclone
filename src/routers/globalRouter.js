import express from "express";

const GLrouter = express.Router();

const home = (req, res) => res.send("home");

GLrouter.get("/", home);

export default GLrouter;
