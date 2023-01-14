import express from "express";
import { home, search } from "../controller/videoController";
import { join, login } from "../controller/userController";

const GLrouter = express.Router();

GLrouter.get("/", home);
GLrouter.get("/join", join);
GLrouter.get("/login", login);
GLrouter.get("/search", search);

export default GLrouter;
