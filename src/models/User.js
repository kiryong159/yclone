import bcrypt from "bcrypt";
import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  password: { type: String },
  name: { type: String },
  location: String,
  Comment: { type: mongoose.Schema.Types.ObjectId, ref: `Comment` },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

Userschema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const USER = mongoose.model("user", Userschema);

export default USER;
