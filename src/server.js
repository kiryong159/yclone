import express from "express";
import morgan from "morgan";
import GLrouter from "./routers/globalRouter";
import Videorouter from "./routers/videoRouter";
import Userrouter from "./routers/userRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/", GLrouter);
app.use("/video", Videorouter);
app.use("/user", Userrouter);

export default app;
