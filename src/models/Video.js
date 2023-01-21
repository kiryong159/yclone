import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema([
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: {
      type: Date,
      required: true,
    },
    hashtags: [{ type: String }],
    meta: {
      views: { type: Number, default: 0, required: true },
      rating: { type: Number, default: 0, required: true },
    },
  },
]);

const VideoModle = mongoose.model(`Video`, VideoSchema);
// DB에 저장될때의 이름 은            ↑이녀석의 소문자 +s 로 이름이 지어짐
export default VideoModle;
