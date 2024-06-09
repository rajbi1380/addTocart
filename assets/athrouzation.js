import { getCookie } from "./cookies.js";
const athrouzation = () => {
  let cookie = getCookie();
  let url = location.href;

  if (
    (cookie && url.includes("auth")) ||
    (!cookie && url.includes("dashboard"))
  ) {
    return location.assign("./index.html");
  } else {
    return false;
  }
};
export default athrouzation;
