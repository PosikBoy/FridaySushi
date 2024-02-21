window.addEventListener("DOMContentLoaded", () => {
  const deliveryOptions = document?.querySelectorAll(
    ".delivery-selection__option"
  );

  deliveryOptions?.forEach(function (option) {
    option.addEventListener("click", function () {
      deliveryOptions.forEach(function (item) {
        item.classList.remove("selected");
      });
      this.classList.add("selected");
    });
  });
  const chooseRestaurantBtn = document?.querySelector(
    ".delivery-selection__pickup-selection"
  );
  const pickupSelection = document?.querySelector(".pickup-selection");
  const pickupSelectionOptions = document?.querySelectorAll(
    ".pickup-selection__option"
  );
  chooseRestaurantBtn?.addEventListener("click", () => {
    pickupSelection.classList.add("active");
  });
  pickupSelectionOptions?.forEach(function (option) {
    option.addEventListener("click", function () {
      pickupSelectionOptions.forEach(function (item) {
        item.classList.remove("selected");
      });
      this.classList.add("selected");
    });
  });
  const pickupBackBtn = document?.querySelector(
    ".pickup-selection__back-button"
  );
  pickupBackBtn?.addEventListener("click", () => {
    pickupSelection.classList.remove("active");
  });

  const addressMenuOptions = document?.querySelectorAll(
    ".my-addresses__option"
  );

  addressMenuOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      addressMenuOptions.forEach(function (item) {
        item.classList.remove("selected");
      });
      this.classList.add("selected");
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
  const chooseAddressButton = document?.querySelector(
    ".delivery-selection__current"
  );
  const myAddresses = document?.querySelector(".my-addresses");
  const myAddressesBackBtn = document?.querySelector(
    ".my-addresses__back-button"
  );

  chooseAddressButton?.addEventListener("click", () => {
    myAddresses.classList.add("active");
  });
  myAddressesBackBtn?.addEventListener("click", () => {
    myAddresses.classList.remove("active");
  });
});

function resizeWishes() {
  const textarea = document.getElementById("wishesTextarea");
  textarea.style.height = "auto"; // Сброс высоты на автоматическую
  textarea.style.height = textarea.scrollHeight + "px"; // Установка высоты textarea в соответствии с содержимым
}

function resizeComment() {
  const textarea = document.getElementById("commentTextarea");
  textarea.style.height = "auto"; // Сброс высоты на автоматическую
  textarea.style.height = textarea.scrollHeight + "px"; // Установка высоты textarea в соответствии с содержимым
}
