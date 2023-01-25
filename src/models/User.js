import bcrypt from "bcrypt";
import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: String,
});

Userschema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const USER = mongoose.model("user", Userschema);

export default USER;
