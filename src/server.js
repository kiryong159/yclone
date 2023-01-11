import express from "express";
const PORT = "4000";
const app = express();

const handleListening = () => console.log("aaa");

app.listen(PORT, handleListening);
// app.listen(4000,  () => console.log("aaa"););
