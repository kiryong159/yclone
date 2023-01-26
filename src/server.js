import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import Videorouter from "./routers/videoRouter";
import Userrouter from "./routers/userRouter";
import { loacalsmiddelware } from "./middleware";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "hello", resave: true, saveUninitialized: true }));
//                         ↑비밀 쪽지? 같은것
app.use(loacalsmiddelware);
app.use("/", rootRouter);
app.use("/video", Videorouter);
app.use("/user", Userrouter);

export default app;
