import express from "express";
const PORT = "4000";
const app = express();

const handleget = (req, res) => {
  return res.send("<h1>hello this is h1</h1>");
};

const Mware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const ProtectMware = (req, res, next) => {
  const url = req.url;
  if (url === "/protect") {
    return res.send("<h1>접근 금지에오</h1>");
  } else {
    console.log("지나가도됨");
    next();
  }
};

const handleProtect = (req, res) => {
  return res.send("how cool is that?");
};

app.use(Mware);
app.use(ProtectMware);
app.get("/", handleget);
app.get("/protect", handleProtect);

const handleListening = () => console.log("이것은 Node.js");
app.listen(PORT, handleListening);
// app.listen(4000,  () => console.log("aaa"););
