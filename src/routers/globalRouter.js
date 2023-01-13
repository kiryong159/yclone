import express from "express";
import { home } from "../controller/videoController";
import { join } from "../controller/userController";

const GLrouter = express.Router();

GLrouter.get("/", home);
GLrouter.get("/join", join);

export default GLrouter;
