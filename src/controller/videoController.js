export const home = (req, res) =>
  res.render("home", { pageTitle: "Home", potato: "tomato" });
export const VideoEdit = (req, res) =>
  res.render("edit", { pageTitle: "Video-Edit" });
export const seeVideo = (req, res) =>
  res.render("watch", { pageTitle: "Watch" });
export const search = (req, res) => res.send("video search");
export const deleteVideo = (req, res) =>
  res.send(`deleteVideo #${req.params.id}`);
export const upload = (req, res) => res.send("upload");
