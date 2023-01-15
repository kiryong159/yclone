export const home = (req, res) => res.render("home");
export const handleVideoEdit = (req, res) => res.render("edit");
export const seeVideo = (req, res) => res.render("watch");
export const search = (req, res) => res.send("video search");
export const deleteVideo = (req, res) =>
  res.send(`deleteVideo #${req.params.id}`);
export const upload = (req, res) => res.send("upload");
