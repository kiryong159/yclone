export const home = (req, res) => res.send("Video homepage");
export const handleVideoEdit = (req, res) =>
  res.send(`video edit#${req.params.id}`);
export const seeVideo = (req, res) => res.send(`video see #${req.params.id}`);
export const search = (req, res) => res.send("search");
export const deleteVideo = (req, res) =>
  res.send(`deleteVideo #${req.params.id}`);
export const upload = (req, res) => res.send("upload");
