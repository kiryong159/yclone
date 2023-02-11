import "dotenv/config";
import "./db";
import "./models/Comment";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = "4000";
const handleListening = () =>
  console.log(`이것은 노드.js 주소는 http://localhost:${PORT}`);
app.listen(PORT, handleListening);

// app.listen(4000,  () => console.log("aaa"););
