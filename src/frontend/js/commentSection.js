const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handlesubmit = (event) => {
  const textarea = form.querySelector("textarea");
  event.preventDefault();
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "" || text === " " || text === "  ") {
    return;
  }
  fetch(`/api/video/${videoId}/comment`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      // express에게 우리가 보내는게 string같지만 json이라고 알려주는것임(이 문구가 없으면 express.json작동안함)
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
};

if (form) {
  form.addEventListener("submit", handlesubmit);
}
