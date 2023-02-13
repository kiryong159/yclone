const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const removeComment = document.querySelectorAll(".removeComment");
const editComment = document.querySelectorAll(".editComment");

const addComment = (text, id) => {
  const video__comments = document.querySelector(".video__comments ul");
  const li = document.createElement("li");
  li.classList = "comment_li";
  const span = document.createElement("span");
  span.innerText = text;
  const icon = document.createElement("i");
  icon.classList = "fas fa-trash removeComment";
  icon.dataset.id = id;
  const icon2 = document.createElement("i");
  icon2.classList = "fas fa-pen-to-square editComment";
  icon2.dataset.id = id;
  const div = document.createElement("div");
  div.classList = "Comment_iconbox";
  li.appendChild(span);
  div.appendChild(icon);
  div.appendChild(icon2);
  li.appendChild(div);
  video__comments.prepend(li);
  icon.addEventListener("click", handleRemoveCM);
  icon2.addEventListener("click", handleEditCM);
};

const handlesubmit = async (event) => {
  const textarea = form.querySelector("textarea");
  event.preventDefault();
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "" || text === " " || text === "  ") {
    return;
  }
  const response = await fetch(`/api/video/${videoId}/comment`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      // express에게 우리가 보내는게 string같지만 json이라고 알려주는것임(이 문구가 없으면 express.json작동안함)
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  if (response.status === 201) {
    const json = await response.json();
    const newCommentId = json.newCommentId;

    addComment(text, newCommentId);
  }
};

const handleRemoveCM = async (event) => {
  const videoId = videoContainer.dataset.id;
  const CommentId = event.target.dataset.id;
  const response = await fetch(`/api/video/${videoId}/comment/delete`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ CommentId }),
  });
  if (response.status === 200) {
    const deleteli = event.target.parentNode.parentNode;
    deleteli.remove();
  }
};

const handleEditCM = (event) => {
  const commentId = event.target.dataset.id;
  const li = event.target.parentNode.parentNode;
  const span = li.querySelector("span");
  const edit = li.querySelector(".editComment");
  const i = li.querySelector("i");
  const mkform = document.createElement("form");
  const mktextarea = document.createElement("textarea");
  const submitBtn = document.createElement("button");
  mkform.classList = commentId;

  mkform.appendChild(mktextarea);
  mkform.appendChild(submitBtn);
  mktextarea.classList = "textarea";
  mktextarea.value = span.innerText;
  mktextarea.cols = 150;
  submitBtn.innerText = "Edit Comment";
  submitBtn.classList = "submitBtn";
  edit.remove();
  i.remove();
  span.remove();
  li.prepend(mkform);
  mkform.addEventListener("submit", submitEditCM);
};

const submitEditCM = async (event) => {
  event.preventDefault();
  const commentId = event.target.className;
  const editvalue = event.target[0].value;
  const respone = await fetch(`/api/comment/${commentId}/edit`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ commentId, editvalue }),
  });
  if (respone.status === 200) {
    event.target.parentNode.remove();
    const video__comments = document.querySelector(".video__comments ul");
    const li = document.createElement("li");
    li.classList = "comment_li";
    const span = document.createElement("span");
    span.innerText = editvalue;
    const icon = document.createElement("i");
    icon.classList = "fas fa-trash removeComment";
    const icon2 = document.createElement("i");
    icon2.classList = "fas fa-pen-to-square editComment";
    icon2.dataset.id = commentId;
    icon.dataset.id = commentId;
    const div = document.createElement("div");
    div.classList = "Comment_iconbox";
    li.appendChild(span);
    div.appendChild(icon);
    div.appendChild(icon2);
    li.appendChild(div);
    video__comments.prepend(li);
    icon.addEventListener("click", handleRemoveCM);
    icon2.addEventListener("click", handleEditCM);
  }
};

if (form) {
  form.addEventListener("submit", handlesubmit);
}
if (removeComment) {
  removeComment.forEach((element) => {
    element.addEventListener("click", handleRemoveCM);
  });
}

if (editComment) {
  editComment.forEach((element) => {
    element.addEventListener("click", handleEditCM);
  });
}
