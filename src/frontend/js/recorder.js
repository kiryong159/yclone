const recordStartbtn = document.getElementById("recordStartbtn");

const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
};

recordStartbtn.addEventListener("click", handleStart);
