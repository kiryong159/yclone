const recordStartbtn = document.getElementById("recordStartbtn");
const preview = document.getElementById("preview");
const previewBtn = document.getElementById("previewBtn");

let stream;
let recorder;
let videoFile;

const handleStart = () => {
  recordStartbtn.innerText = "Stop Record";
  recordStartbtn.removeEventListener("click", handleStart);
  recordStartbtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data);
    preview.srcObject = null;
    preview.src = videoFile;
    preview.loop = true;
    preview.play();
  };
  recorder.start();
};

const handleStop = () => {
  recordStartbtn.innerText = "Download Record";
  recorder.stop();
  recordStartbtn.removeEventListener("click", handleStop);
  recordStartbtn.addEventListener("click", handleDownload);
};

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "My Record.webm";
  document.body.appendChild(a);
  a.click();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  preview.srcObject = stream;
  preview.play();
};

previewBtn.addEventListener("click", init);
recordStartbtn.addEventListener("click", handleStart);
