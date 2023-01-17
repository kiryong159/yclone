const videos = [
  {
    name: "First video",
    score: 5,
    comment: 2,
    postAt: 5,
    views: 200,
    id: 0,
  },
  {
    name: "second video",
    score: 4,
    comment: 1,
    postAt: 5,
    views: 440,
    id: 1,
  },
  {
    name: "third video",
    score: 3,
    comment: 7,
    postAt: 5,
    views: 1,
    id: 2,
  },
];

export const home = (req, res) => {
  return res.render("home", {
    pageTitle: "Home",
    potato: "tomato",
    videos,
  });
};

export const VideoGetEdit = (req, res) => {
  const id = req.params.id;
  const nowvideo = videos[id];
  return res.render("edit", { pageTitle: `Edit ${nowvideo.name}`, nowvideo });
};

export const VideoPostEdit = (req, res) => {
  const { id } = req.params;
  const nowvideo = videos[id];
  const Newtitle = req.body.name;
  videos[id].name = Newtitle;
  return res.redirect(`/video/${nowvideo.id}`);
};

export const watchVideo = (req, res) => {
  const id = req.params.idpotato;
  // ES6문법 작성시 >>const {id} = req.params
  const nowvideo = videos[id];
  return res.render("watch", { pageTitle: `Watch ${nowvideo.name}`, nowvideo });
};

export const search = (req, res) => res.send("video search");
export const deleteVideo = (req, res) =>
  res.send(`deleteVideo #${req.params.id}`);
export const upload = (req, res) => res.send("upload");
