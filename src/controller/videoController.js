import video from "../models/Video";

export const home = async (req, res) => {
  const videos = await video.find({});
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

export const postUpload = (req, res) => {
  const videoname = req.body.uploadname;
  return res.redirect("/");
};

export const deleteVideo = (req, res) =>
  res.send(`deleteVideo #${req.params.id}`);
