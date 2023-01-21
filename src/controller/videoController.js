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

export const VideoGetEdit = (req, res) => {
  const id = req.params.id;
  return res.render("edit", { pageTitle: `Edit` });
};

export const VideoPostEdit = (req, res) => {
  const { id } = req.params;
  return res.redirect(`/video/${nowvideo.id}`);
};

export const watchVideo = (req, res) => {
  const id = req.params.idpotato;
  // ES6문법 작성시 >>const {id} = req.params
  return res.render("watch", { pageTitle: `Watch` });
};

export const search = (req, res) => res.send("video search");

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const videoname = req.body.uploadname;
  const { description, hashtags } = req.body;
  // 비디오 모델을 여기 ↓사용
  const video = new Video({
    title: videoname,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  await video.save();
  // const video 부분을 await video.create({블라블라}) 가능함
  return res.redirect("/");
};

export const deleteVideo = (req, res) =>
  res.send(`deleteVideo #${req.params.id}`);
