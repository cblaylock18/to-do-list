import "./style.css";

const newDiv = document.createElement("div");
newDiv.textContent = "Hi again";

const body = document.querySelector("body");
body.appendChild(newDiv);
