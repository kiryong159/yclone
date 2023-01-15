import express from "express";
import morgan from "morgan";
import GLrouter from "./routers/globalRouter";
import Videorouter from "./routers/videoRouter";
import Userrouter from "./routers/userRouter";

const PORT = "4000";
const app = express();
app.set("view engine", "pug");
app.use(morgan("dev"));

app.use("/", GLrouter);
app.use("/video", Videorouter);
app.use("/user", Userrouter);

const handleListening = () =>
  console.log(`이것은 노드.js 주소는 http://localhost:${PORT}`);
app.listen(PORT, handleListening);
// app.listen(4000,  () => console.log("aaa"););
