let modal = document.getElementById("modal");
let modalText = modal.querySelector("p");
const closeModal = modal.querySelector("span");
const showModal = (text) => {
  modalText.innerText = text;
  modal.style.display = "flex ";
};
closeModal.addEventListener("click", () => (modal.style.display = "none"));
export { showModal };
