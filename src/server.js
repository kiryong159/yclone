import express from "express";
const PORT = "4000";
const app = express();

const handleget = (req, res) => {
  return res.send("<h1>hello this is h1</h1>");
};
const handlespen = (req, res) => {
  return res.send("how cool is that?");
};

app.get("/", handleget);
app.get("/span", handlespen);

const handleListening = () => console.log("bbb");
app.listen(PORT, handleListening);
// app.listen(4000,  () => console.log("aaa"););
