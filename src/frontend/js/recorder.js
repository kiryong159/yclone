import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const recordActionbtn = document.getElementById("recordActionbtn");
const preview = document.getElementById("preview");

const Files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

let stream;
let recorder;
let videoFile;

const handleStart = () => {
  recordActionbtn.innerText = "Recording(5s)";
  recordActionbtn.disabled = true;
  recordActionbtn.removeEventListener("click", handleStart);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data);
    preview.srcObject = null;
    preview.src = videoFile;
    preview.loop = true;
    preview.play();
    recordActionbtn.innerText = "Download";
    recordActionbtn.disabled = false;
    recordActionbtn.addEventListener("click", handleDownload);
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 5000);
};

const DownloadFile = (FileUrl, FileName) => {
  const a = document.createElement("a");
  a.href = FileUrl;
  a.download = FileName;
  document.body.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  recordActionbtn.removeEventListener("click", handleDownload);
  recordActionbtn.innerText = "Transcording...";
  recordActionbtn.disabled = true;
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();
  ffmpeg.FS("writeFile", Files.input, await fetchFile(videoFile));
  await ffmpeg.run("-i", Files.input, "-r", "60", Files.output);
  await ffmpeg.run(
    "-i",
    Files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    Files.thumb
  );

  const mp4File = ffmpeg.FS("readFile", Files.output);
  const thumbFile = ffmpeg.FS("readFile", Files.thumb);

  const mp4blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  DownloadFile(mp4Url, "My Record.mp4");
  DownloadFile(thumbUrl, "MyThumbnail.jpg");

  ffmpeg.FS("unlink", Files.input);
  ffmpeg.FS("unlink", Files.output);
  ffmpeg.FS("unlink", Files.thumb);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);

  recordActionbtn.disabled = false;
  recordActionbtn.innerText = "Recording Again";
  recordActionbtn.addEventListener("click", handleStart);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: 1024, height: 576 },
  });
  preview.srcObject = stream;
  preview.play();
};

init();
recordActionbtn.addEventListener("click", handleStart);
