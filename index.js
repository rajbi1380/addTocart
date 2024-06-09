import { getData } from "./assets/httpreauest.js";
import shortForm from "./assets/shortFormtitle.js";
import { getCookie } from "./assets/cookies.js";
import { showModal } from "./assets/modal.js";
let productsBox = document.querySelector(".products-box");
let numberOfItem = document
  .querySelector("header")
  .querySelector("div")
  .querySelector("sup");
let addBtn = document.querySelector(".addBtn");
let boxItem = document.querySelector(".boxItem");
let totalPrice = document.querySelector(".total-price");
let closeCart = document.querySelector(".close-cart");
let panelCarts = document.querySelector(".panelCarts");
let btnLog = document.querySelector(".logIn");
let searchBtn = document.querySelector(".searchBtn");
let inputvaleuOfSearch = document.querySelector("input");
let listItems = document.querySelectorAll("li");
let setBuy = document.querySelector(".setBuy");

let dashboardbtn = document.querySelector(".dashboardbtn");
let allData = null;
let cartData = JSON.parse(localStorage.getItem("cart")) || [];
let inputValueOfSearch = "";
let catergory = "all";
window.buyItems = (id) => {
  let cookie = document.cookie;
  if (cookie) {
    let item = allData.find((p) => p.id === +id);

    if (item) {
      let existItem = cartData.find((i) => i.id === item.id);

      if (existItem) {
        existItem.qty += 1;

        localStorage.setItem("cart", JSON.stringify(cartData));
      } else {
        item.qty = 1;
        cartData.push(item);

        localStorage.setItem("cart", JSON.stringify(cartData));
      }
    } else {
      alert("Item not found in allData.");
    }
    TotalPrice();
    showCarts(cartData);

    numberOfItem.innerHTML++;
  }
};

const showProdcuts = (prodcuts) => {
  productsBox.innerHTML = "";
  prodcuts.forEach((product) => {
    let item = `   <div> <img src="${product.image}" alt="${product.title}" />
    <h4>${shortForm(product.title)}</h4>
    <div id='price'><p>$ ${product.price}</p>
    <button onclick=buyItems('${
      product.id
    }')>Buy<i class="fa-solid fa-cart-shopping"></i></button>
    </div>
    <div  id='rate'><i class="fa-solid fa-star"></i> <span>${
      product.rating.rate
    }</span>
    </div><div id='count'><i class="fa-solid fa-user"></i> <span>${
      product.rating.count
    }</span>
    </div>
    </div>`;
    productsBox.innerHTML += item;
  });
};
window.removeItem = (id) => {
  let removeCart = cartData.filter((cart) => cart.id === +id);
  removeCart.forEach((item) => {
    if (item.qty > 1) {
      numberOfItem.innerHTML--;
      item.qty--;
    } else {
      removeItems();
    }
  });

  showCarts(cartData);
  TotalPrice();
  localStorage.setItem("cart", JSON.stringify(cartData));
};

window.removeItems = (id) => {
  let removeItem = cartData.findIndex((cart) => cart.id == +id);
  cartData.splice(removeItem, 1);
  numberOfItem.innerHTML = cartData.length;
  showCarts(cartData);
  TotalPrice();
  localStorage.setItem("cart", JSON.stringify(cartData));
};
window.addItems = (id) => {
  let item = cartData.find((cart) => cart.id === +id);
  if (item.qty >= 1) {
    numberOfItem.innerHTML++;

    item.qty++;
  } else {
    return;
  }

  showCarts(cartData);
  TotalPrice();

  localStorage.setItem("cart", JSON.stringify(cartData));
};
const showCarts = (data) => {
  boxItem.innerHTML = "";

  console.log(data);
  data.forEach((d) => {
    let createEle = `<div><img src="${d.image}" alt="${d.alt}" />
    <div class="info-cart"><h4>${shortForm(d.title)}</h4><p>$${
      d.price
    }</p></div>
    <div class="control-btn"><div>
    <button onclick=removeItem('${d.id}') >-</button><span>${d.qty}</span>
    <button onclick=addItems('${d.id}')>+</button></div>
    <button class=remove  onclick=removeItems('${
      d.id
    }')>Remove</button></div></div>`;
    boxItem.innerHTML += createEle;
  });
};
const addBtnHandler = (e) => {
  e.preventDefault();

  panelCarts.classList.add("active");
};
const closeCartHandler = () => {
  panelCarts.classList.remove("active");
};

const init = async () => {
  let cookie = getCookie();

  if (cookie) {
    btnLog.style.display = "none";
  } else {
    btnLog.style.display = "block";

    dashboardbtn.style.display = "none";
  }
  allData = await getData("products");

  showProdcuts(allData);

  if (cartData.length === 0) {
    numberOfItem.innerHTML = "0";
    totalPrice.innerHTML = `$${"0"}`;
  } else {
    // let indexOfArray = cartData.map((i) => +i.qty);

    // let lastIndex = indexOfArray[indexOfArray.length - 1];

    // numberOfItem.innerHTML = lastIndex;
    let sum = 0;
    cartData.forEach((num) => {
      sum += num.qty;
    });
    numberOfItem.innerHTML = sum;
    TotalPrice();
  }
  showCarts(cartData);
};

const TotalPrice = () => {
  const total = cartData.reduce((pre, cur) => pre + cur.price * cur.qty, 0);
  totalPrice.innerHTML = "$" + Math.floor(total);
};
const filterItems = (value) => {
  let itemfiltered = null;
  if (value) {
    if (catergory === "all") {
      itemfiltered = allData.filter((item) =>
        item.title.toLowerCase().includes(value)
      );
    } else {
      itemfiltered = allData.filter((item) => {
        item.title.toLowerCase().includes(value) &&
          item.catergory.toLowerCase() === catergory;
      });
    }
  } else {
    if (catergory === "all") {
      itemfiltered = allData;
    } else {
      itemfiltered = allData.filter(
        (item) => item.category.toLowerCase() === catergory
      );
    }
  }
  showProdcuts(itemfiltered);
};
const searchBtnHandler = () => {
  inputValueOfSearch = inputvaleuOfSearch.value.trim().toLowerCase();
  if (!inputvaleuOfSearch.value) {
    showModal("please enter value");
  }
  filterItems(inputValueOfSearch);
};
const filterHandler = (e) => {
  catergory = e.target.innerText.toLowerCase();

  listItems.forEach((item) => {
    if (item.innerText.toLowerCase() === catergory) {
      item.className = "selected";
    } else {
      item.className = "";
    }
  });
  filterItems();
};
const setbuyHandler = () => {
  if (cartData.length !== 0) {
    cartData.length = 0;
    // show.length = 0;
    localStorage.setItem("cart", JSON.stringify([]));
    boxItem.innerHTML = "";
    totalPrice.innerHTML = "$0";
    numberOfItem.innerHTML = cartData.length;
    panelCarts.classList.remove("active");
  } else {
    showModal("you dont have carts");
  }
};
listItems.forEach((item) => {
  item.addEventListener("click", filterHandler);
});
addBtn.addEventListener("click", addBtnHandler);
closeCart.addEventListener("click", closeCartHandler);
document.addEventListener("DOMContentLoaded", init);
searchBtn.addEventListener("click", searchBtnHandler);
setBuy.addEventListener("click", setbuyHandler);
