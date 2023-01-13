import express from "express";
const Userrouter = express.Router();

const useredit = (req, res) => {
  return res.send("edit");
};

Userrouter.get("/edit", useredit);
export default Userrouter;
