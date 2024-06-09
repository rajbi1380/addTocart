import { getData } from "./assets/httpreauest.js";
import { showModal } from "./assets/modal.js";
let conatiner = document.querySelector(".container");
let logOutBtn = document.querySelector("button");

let dataUsers = null;
let cartData = JSON.parse(localStorage.getItem("cart"));
const showUsers = async (data) => {
  conatiner.innerHTML = "";

  data.forEach((d) => {
    let jsx = `<div class="card"><h3>${d.id}</h3><div>
  <p><i class="fa-solid fa-user"></i>Name: </p>
  <span>${d.name.firstname} ${d.name.lastname}</span></div><div>
  <p><i class="fa-solid fa-paperclip"></i>UserName: </p>
  <span>${d.username} </span></div><div>
  <p><i class="fa-solid fa-envelope"></i>email: </p>
  <span>${d.email} </span></div><div>
  <p><i class="fa-solid fa-phone"></i>Phone: </p>
  <span>${d.phone} </span></div><div>
  <p><i class="fa-solid fa-location-dot"></i>Address: </p>
  <span>${d.address.city} - ${d.address.street} - ${d.address.zipcode} </span></div>
  </div>`;
    conatiner.innerHTML += jsx;
  });
};
const init = async () => {
  dataUsers = await getData("users");
  showUsers(dataUsers);
};
const logOutHandler = () => {
  if (cartData.length !== 0) {
    showModal("please Complete your buying");
  } else {
    document.cookie = `token=; max-age=0`;
    location.assign("./index.html");
  }
};
logOutBtn.addEventListener("click", logOutHandler);
document.addEventListener("DOMContentLoaded", init);
