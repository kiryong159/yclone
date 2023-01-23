import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema([
  {
    title: { type: String, required: true, trim: true, maxLength: 30 },
    description: { type: String, required: true, trim: true, minLength: 10 },
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

VideoSchema.static("FormatHashtags", function (potato) {
  return potato
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

// VideoSchema.pre("save", async function () {
//   this.hashtags = this.hashtags[0]
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word : `#${word}`));
// });

const VideoModle = mongoose.model(`Video`, VideoSchema);
// DB에 저장될때의 이름 은            ↑이녀석의 소문자 +s 로 이름이 지어짐
export default VideoModle;
