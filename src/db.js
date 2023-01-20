import mongoose from "mongoose";
//몽구즈.셋.(스트릭쿼리가 컨넥트 보다 먼저들어와야함)
mongoose.set("strictQuery", true);

mongoose.connect("mongodb+srv://kiryong:1234@yclone.fhkppsh.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
