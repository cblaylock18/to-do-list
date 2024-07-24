import logo from "./logo.svg";
import userIcon from "./user-icon.svg";

function imageSourcer() {
    document.querySelector(".logo").src = logo;
    document.querySelector(".user-icon").src = userIcon;
}

export { imageSourcer };
