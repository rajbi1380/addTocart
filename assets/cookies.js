const setCookie = (data) => {
  document.cookie = `token=${data};max-age=${24 * 60 * 60} pass=/`;
};
const getCookie = () => {
  let cookie = document.cookie;
  if (cookie) {
    let cookieArray = cookie.split("=");
   
    return { [cookieArray[0]]: cookieArray[1] };
  } else {
    return false;
  }
};
export { setCookie, getCookie };
