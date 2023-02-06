const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullscreen = document.getElementById("fullscreen");
const videoContainer = document.getElementById("videoContainer");

let volumeValue = 0.5;
video.volume = volumeValue;

const handelPlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handelvideoclick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const handelmute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
    muteBtn.innerText = "UnMute";
  }
  muteBtn.innerText = video.muted ? "UnMute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
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
    fullscreen.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullscreen.innerText = "Exit Full Screen";
  }
};
playBtn.addEventListener("click", handelPlayClick);
muteBtn.addEventListener("click", handelmute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleloadedmetadata);
video.addEventListener("timeupdate", handletimeupdate);
video.addEventListener("click", handelvideoclick);
timeline.addEventListener("input", handletimelinechange);
timeline.addEventListener("mousedown", timelineMousedown);
timeline.addEventListener("mouseup", timelineMouseup);
fullscreen.addEventListener("click", handleFullScreen);
