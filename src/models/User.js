import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  loacation: String,
});

const USER = mongoose.model("user", Userschema);

export default USER;
