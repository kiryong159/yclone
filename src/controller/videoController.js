export const home = (req, res) => {
  const videos = [
    {
      name: "First video",
      score: "5",
      comment: "2",
      postAt: "5",
      views: "200",
    },
    {
      name: "second video",
      score: "4",
      comment: "1",
      postAt: "5",
      views: "440",
    },
    {
      name: "third video",
      score: "3",
      comment: "7",
      postAt: "5",
      views: "260",
    },
  ];
  return res.render("home", {
    pageTitle: "Home",
    potato: "tomato",
    videos,
  });
};
export const VideoEdit = (req, res) =>
  res.render("edit", { pageTitle: "Video-Edit" });
export const seeVideo = (req, res) =>
  res.render("watch", { pageTitle: "Watch" });
export const search = (req, res) => res.send("video search");
export const deleteVideo = (req, res) =>
  res.send(`deleteVideo #${req.params.id}`);
export const upload = (req, res) => res.send("upload");
