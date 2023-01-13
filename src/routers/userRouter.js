import express from "express";
import { handleUseredit, handleUserremove } from "../controller/userController";
const Userrouter = express.Router();

Userrouter.get("/edit", handleUseredit);
Userrouter.get("/remove", handleUserremove);

export default Userrouter;
