import { now } from "mongoose";
import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", {
    pageTitle: "Home",
    potato: "tomato",
    videos,
  });
};

export const VideoGetEdit = async (req, res) => {
  const id = req.params.id;
  const nowvideo = await Video.findById(id);
  if (!nowvideo) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  return res.render("edit", { pageTitle: `Edit`, nowvideo });
};

export const VideoPostEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const nowvideo = await Video.exists({ _id: id });
  if (!nowvideo) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags,
  });
  return res.redirect(`/video/${id}`);
};

export const watchVideo = async (req, res) => {
  const id = req.params.idpotato;
  // ES6문법 작성시 >>const {id} = req.params
  //  모델.findbyid
  const nowvideo = await Video.findById(id);
  if (nowvideo) {
    return res.render("watch", { pageTitle: `${nowvideo.title}`, nowvideo });
  } else {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
};

export const search = (req, res) => res.send("video search");

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const videoname = req.body.uploadname;
  const { description, hashtags } = req.body;
  const TIMEDIFF = 9 * 60 * 60 * 1000;
  // 여기 ↓사용  비디오 모델
  try {
    await Video.create({
      title: videoname,
      description,
      hashtags: hashtags,
      createdAt: Date.now() + TIMEDIFF,
      // 우분투 인지 아틀라스인지 시간이 UTC로설정 되어있어서 KST+9시간 추가해줬음 그래서 Vidoe.js에 디폴트 안씀
    });
    return res.redirect("/");
  } catch (error) {
    const ERRMSG = error._message;
    return res.render("upload", { pageTitle: "Upload", ERRMSG });
  }
};

export const deleteVideo = (req, res) =>
  res.send(`deleteVideo #${req.params.id}`);
