import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  const videos = await Video.find({}).populate("owner");
  return res.render("home", {
    pageTitle: "Home",
    videos,
  });
};

export const VideoGetEdit = async (req, res) => {
  const id = req.params.id;
  const nowvideo = await Video.findById(id);
  if (!nowvideo) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (String(req.session.user._id) !== String(nowvideo.owner)) {
    console.log(
      `로그인 중인 아이디${String(req.session.user._id)}`,
      `비디오 주인${String(nowvideo.owner)}`
    );
    req.flash("error", "비디오의 주인이 아닙니다.");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit`, nowvideo });
};

export const VideoPostEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const nowvideo = await Video.findById(id);
  if (!nowvideo) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (String(req.session.user._id) !== String(nowvideo.owner)) {
    console.log(
      `로그인 중인 아이디${String(req.session.user._id)}`,
      `비디오 주인${String(nowvideo.owner)}`
    );
    req.flash("error", "비디오의 주인이 아닙니다.");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.FormatHashtags(hashtags),
  });
  req.flash("info", "비디오 업데이트 완료");
  return res.redirect(`/video/${id}`);
};

export const watchVideo = async (req, res) => {
  const id = req.params.idpotato;
  // ES6문법 작성시 >>const {id} = req.params
  //  모델.findbyid
  const nowvideo = await Video.findById(id)
    .populate("owner")
    .populate("Comment");
  if (nowvideo) {
    return res.render("watch", {
      pageTitle: `${nowvideo.title}`,
      nowvideo,
    });
  } else {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const id = req.session.user._id;
  const videoname = req.body.uploadname;
  const { description, hashtags } = req.body;
  const TIMEDIFF = 9 * 60 * 60 * 1000;
  const { video, thumb } = req.files;
  console.log(video, thumb);
  // 여기 ↓사용  비디오 모델
  try {
    const newVideo = await Video.create({
      owner: id,
      title: videoname,
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path,
      description,
      hashtags: Video.FormatHashtags(hashtags),
      createdAt: Date.now() + TIMEDIFF,
      // 우분투 인지 아틀라스인지 시간이 UTC로설정 되어있어서 KST+9시간 추가해줬음 그래서 Vidoe.js에 디폴트 안씀
    });
    const user = await User.findById(id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    const ERRMSG = error._message;
    return res.status(400).render("upload", { pageTitle: "Upload", ERRMSG });
  }
};

export const deleteVideo = async (req, res) => {
  const id = req.params.id;
  const nowvideo = await Video.findById(id);
  const user = await User.findById(id);
  if (!nowvideo) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (req.session.user._id !== String(nowvideo.owner)) {
    console.log(
      `로그인 중인 아이디${String(req.session.user._id)}`,
      `비디오 주인${String(nowvideo.owner)}`
    );
    req.flash("error", "비디오 주인이 아닙니다.");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  req.flash("info", "삭제 완료");
  return res.redirect("/");
  // 지워도 user.videos 에 남아있음
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: { $regex: new RegExp(keyword, "i") },
      //regex->레귤러 익스프레스? 인듯
      //`^${keword}` -> 키워드로 시작하는 것 찾을수있음  `${keyword}$` ->키워드로 끝나는거 찾을수있음
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

// req.body = > form으로 POST 한것의 정보
// req.params => router/~~ 에서 ~~의정보 ex) video/:potato -> req.params.potato  ->potato의정보를가져옴
// req.query = > form으로 GET 한것의 정보 / 주소창에 ? 뒤에 붙어있는듯함.

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;

  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.Comment.push(comment._id);
  video.save();
  return res.sendStatus(201);
};
