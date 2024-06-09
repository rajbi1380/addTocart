import { setData } from "./assets/httpreauest.js";
import { setCookie } from "./assets/cookies.js";
import athrouzation from "./assets/athrouzation.js";
let logInBtn = document.querySelector("button");
let inputs = document.querySelectorAll("input");

const logInHandler = async (e) => {
  e.preventDefault();
  let inputValue = inputs[0].value;
  let inputPassword = inputs[1].value;
  let data = await setData("auth/login", { inputValue, inputPassword });
  setCookie(data.token);
  location.assign("./index.html");
};

logInBtn.addEventListener("click", logInHandler);
document.addEventListener("DOMContentLoaded", athrouzation);
