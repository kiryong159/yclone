import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import Videorouter from "./routers/videoRouter";
import Userrouter from "./routers/userRouter";
import { loacalsmiddelware } from "./middleware";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    // ↑비밀 쪽지? 같은것
    resave: false,
    //resave:true 세션 변경사항이 있든없든 저장함
    saveUninitialized: false,
    // 둘다 false 로 두면 로그인한 유저만 세션에 남음
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(loacalsmiddelware);
// pug는 res.locals와 통신할수있음 -> router 가기전에 미들웨어로 req.session값을 local과 이어주면 어디에서나 사용가능
app.use("/uploads", express.static("uploads"));
// static -> 브라우저에게 해당파일을 공개 하겠다는 뜻
app.use("/", rootRouter);
app.use("/video", Videorouter);
app.use("/user", Userrouter);

export default app;
