import express from "express";
import morgan from "morgan";

const PORT = "4000";
const app = express();
app.use(morgan("dev"));

const GLrouter = express.Router();
const home = (req, res) => res.send("home");
GLrouter.get("/", home);
const Videorouter = express.Router();
const videowatch = (req, res) => res.send("watch");
Videorouter.get("/watch", videowatch);
const Userrouter = express.Router();
const useredit = (req, res) => {
  return res.send("edit");
};
Userrouter.get("/edit", useredit);

app.use("/", GLrouter);
app.use("/video", Videorouter);
app.use("/user", Userrouter);

const handleListening = () => console.log("이것은 Node.js");
app.listen(PORT, handleListening);
// app.listen(4000,  () => console.log("aaa"););
