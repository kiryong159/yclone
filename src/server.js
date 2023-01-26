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
// pug는 res.locals와 통신할수있음 -> router 가기전에 미들웨어로 req.session값을 local과 이어주면 어디에서나 사용가능
app.use("/", rootRouter);
app.use("/video", Videorouter);
app.use("/user", Userrouter);

export default app;
