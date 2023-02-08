const video = document.querySelector("video");
const playicon = document.getElementById("playicon");
const muteicon = document.getElementById("muteicon");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullscreen = document.getElementById("fullscreen");
const videoContainer = document.getElementById("videoContainer");
const videoController = document.getElementById("videoController");

let volumeValue = 0.5;
let controlsTimeout = null;
let controlsMovementTimeout = null;
video.volume = volumeValue;

const handelPlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playicon.classList = video.paused ? `fas fa-play` : `fas fa-pause`;
};

const handelvideoclick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playicon.classList = video.paused ? `fas fa-play` : `fas fa-pause`;
};

const handelmute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteicon.classList = video.muted
    ? `fa-solid fa-volume-xmark`
    : `fa-solid fa-volume-high`;
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  if (video.muted) {
    video.muted = false;
    muteicon.classList = "fa-solid fa-volume-high";
  }
  volumeValue = e.target.value;
  video.volume = e.target.value;
};

const formatTime = (second) =>
  new Date(second * 1000).toISOString().substring(14, 19);

const handleloadedmetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
const handletimeupdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handletimelinechange = (e) => {
  video.currentTime = e.target.value;
};

let videostatus = false;
const timelineMousedown = () => {
  if (!video.paused) {
    videostatus = true;
    video.pause();
  }
};
const timelineMouseup = () => {
  if (videostatus) {
    videostatus = false;
    video.play();
  }
};

const handleFullScreen = () => {
  const fullscreenCheck = document.fullscreenElement;
  if (fullscreenCheck) {
    document.exitFullscreen();
    fullscreen.classList = "fa-solid fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullscreen.classList = "fa-solid fa-compress";
  }
};

const hidecontrols = () => {
  videoController.classList.remove("showing");
};

const handelMousemove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoController.classList.add("showing");
  controlsMovementTimeout = setTimeout(hidecontrols, 3000);
};

const handleMouseleave = () => {
  controlsTimeout = setTimeout(hidecontrols, 3000);
};

const handelkeydown = (event) => {
  if (event.key === ` `) {
    handelvideoclick();
  }
  if ((event.key === "m") | "M") {
    handelmute();
  }
};

const handleEnded = () => {
  const id = videoContainer.dataset.id;
  fetch(`/api/video/${id}/view`, { method: "post" });
};

playicon.addEventListener("click", handelPlayClick);
muteicon.addEventListener("click", handelmute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleloadedmetadata);
video.addEventListener("timeupdate", handletimeupdate);
video.addEventListener("click", handelvideoclick);
video.addEventListener("ended", handleEnded);
timeline.addEventListener("input", handletimelinechange);
timeline.addEventListener("mousedown", timelineMousedown);
timeline.addEventListener("mouseup", timelineMouseup);
fullscreen.addEventListener("click", handleFullScreen);
videoContainer.addEventListener("mousemove", handelMousemove);
videoContainer.addEventListener("mouseleave", handleMouseleave);
document.addEventListener("keydown", handelkeydown);
