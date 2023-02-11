const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const button = form.querySelector("button");

const handlesubmit = (event) => {
  event.preventDefault();
  console.log(textarea.value);
};

form.addEventListener("submit", handlesubmit);
