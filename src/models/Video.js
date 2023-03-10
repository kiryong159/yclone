import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema([
  {
    title: { type: String, required: true, trim: true, maxLength: 30 },
    fileUrl: { type: String, required: true },
    thumbUrl: { type: String, required: true },
    description: { type: String, required: true, trim: true, minLength: 2 },
    createdAt: {
      type: Date,
      required: true,
    },
    hashtags: [{ type: String }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: `user`,
    },
    // ref 는 user스키마 제작할때에 이름으로 작성해야함 ㅅㅂ
    Comment: [{ type: mongoose.Schema.Types.ObjectId, ref: `Comment` }],
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
