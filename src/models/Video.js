import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema([
  {
    title: String,
    description: String,
    createdAt: Date,
    hashtags: [{ type: String }],
    meta: {
      views: Number,
      rating: Number,
    },
  },
]);

const VideoModle = mongoose.model(`Video`, VideoSchema);
// DB에 저장될때의 이름 은            ↑이녀석의 소문자 +s 로 이름이 지어짐
export default VideoModle;
