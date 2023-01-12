import express from "express";
const PORT = "4000";
const app = express();

const handleget = (req, res) => {
  return res.send("<h1>hello this is h1</h1>");
};

const Mware = (req, res, next) => {
  console.log(`이자식의 목적지는 ${req.url}`);
  next();
};

const handlespan = (req, res) => {
  return res.send("how cool is that?");
};

app.get("/", Mware, handleget);
app.get("/span", handlespan);

const handleListening = () => console.log("bbb");
app.listen(PORT, handleListening);
// app.listen(4000,  () => console.log("aaa"););
