const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const time = document.getElementById("time");

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

playBtn.addEventListener("click", handelPlayClick);
muteBtn.addEventListener("click", handelmute);
volumeRange.addEventListener("input", handleVolumeChange);
