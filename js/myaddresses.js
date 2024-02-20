const addressMenuOptions = document?.querySelectorAll(".my-addresses__option");

addressMenuOptions.forEach(function (option) {
  option.addEventListener("click", function () {
    addressMenuOptions.forEach(function (item) {
      item.classList.remove("selected");
      let saveButton = item.querySelector(".my-addresses__save");
      saveButton.classList.remove("active");
    });
    this.classList.add("selected");
  });
});

const addressInputs = document?.querySelectorAll("#addressInput");
addressInputs.forEach((item) => {
  item.addEventListener("input", (event) => {
    let saveButton = item.parentNode.parentNode.querySelector(
      ".my-addresses__save"
    );
    saveButton.classList.add("active");
  });
});

const deleteButtons = document?.querySelectorAll(".my-adresses__delete");
const modalMenu = document?.querySelector(".modal-menu");
const bright80 = document?.querySelector(".bright80");
console.log(bright80);
deleteButtons.forEach((item) => {
  item.addEventListener("click", (event) => {
    modalMenu.classList.add("active");
    bright80.classList.add("active");
  });
});

const deleteButton = document?.querySelector(".modal-menu__delete-button");
const cancelButton = document?.querySelector(".modal-menu__cancel-button");

deleteButton.addEventListener("click", (event) => {
  modalMenu.classList.remove("active");
  bright80.classList.remove("active");
});
cancelButton.addEventListener("click", (event) => {
  modalMenu.classList.remove("active");
  bright80.classList.remove("active");
});
