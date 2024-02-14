//categories

var categoryList = document.querySelector(".categories__list");
var categoryMenuButton = document.querySelector(".categories__menu-button");
var bright80 = document.querySelector(".bright80");

const toggleBrightness = () => {
  bright80.classList.toggle("active");
};

isMenuButtonShown = false;
function addMenuButton() {
  categoryMenuButton.classList = "categories__menu-button menu-button";
  isMenuButtonShown = true;
}

function removeMenuButton() {
  categoryMenuButton.classList = "categories__menu-button menu-button closed";
  isMenuButtonShown = false;
}

window.addEventListener("scroll", function () {
  var rect = categoryList.getBoundingClientRect();
  if (rect.top <= 10) {
    addMenuButton();
  } else {
    if (isMenuButtonShown) {
      removeMenuButton();
    }
  }
});

//сhoose-city
const chooseCity = document.querySelector(".choose-city");
const chooseCityLink = document.querySelectorAll(".choose-city__link");
const body = document.querySelector("body");

chooseCityLink.forEach(function (chooseCityLink) {
  chooseCityLink.addEventListener("click", function (event) {
    event.preventDefault();
    body.classList = "";
    chooseCity.classList = "choose-city hidden";
    toggleBrightness();
  });
});

//sidebar
const sideBar = document.querySelector(".side-bar");
const headerMenuButton = document.querySelector(".header__menu-button");

headerMenuButton.addEventListener("click", function (event) {
  event.preventDefault();
  body.classList.toggle("inactive");
  headerMenuButton.classList.toggle("open");
  sideBar.classList.toggle("hidden");
  toggleBrightness();
});
categoryMenuButton.addEventListener("click", function (event) {
  event.preventDefault();
  body.classList.toggle("inactive");
  headerMenuButton.classList.toggle("open");
  sideBar.classList.toggle("hidden");
  toggleBrightness();
});

// product card
const sushi = document.querySelector("#sushi");
const sushiCard = document.querySelector("#sushiCard");

sushi.addEventListener("click", (event) => {
  toggleBrightness();
  sushiCard.classList.toggle("hidden");
  body.classList.add("inactive");
});

const productCola = document.querySelector("#cola");
const productCardCola = document.querySelector("#colaCard");

productCola.addEventListener("click", (event) => {
  toggleBrightness();
  productCardCola.classList.toggle("hidden");
  body.classList.add("inactive");
});

const swipeElements = document.querySelectorAll(".swipe");

swipeElements.forEach((item) => {
  // const toCartBtn = document.querySelector(".product-card__button");

  // toCartBtn.addEventListener("click", () => {
  //   hideMenu();
  // });
  var startY, startBottom, startHeight;

  var menuVisible = true;
  function updateMenu(newBottom) {
    item.style.bottom = newBottom + "px";
  }
  function hideMenu() {
    item.style = "";
    item.style.transition = "bottom 0.5s ease";
    item.classList.add("hidden");
    body.classList.remove("inactive");

    menuVisible = false;
    setTimeout(() => {
      item.style = "";
    }, 500);
    toggleBrightness();
  }
  function showMenu() {
    item.style.transition = "bottom 0.3s ease";
    item.style.bottom = "0";
    menuVisible = true;
  }
  item.addEventListener("touchstart", function (e) {
    startY = e.touches[0].clientY;
    item.style.transition = "none";
    startBottom = parseInt(
      window.getComputedStyle(item).getPropertyValue("bottom")
    );
    startHeight = item.offsetHeight;
  });
  item.addEventListener("touchmove", function (e) {
    item.style.transition = "none";
    var currentY = e.touches[0].clientY;
    var diff = currentY - startY;
    var newBottom = startBottom - diff;

    if (newBottom >= -startHeight && newBottom <= 0) {
      requestAnimationFrame(function () {
        updateMenu(newBottom);
      });
    }
  });
  item.addEventListener("touchend", function (e) {
    var touchEndY = e.changedTouches[0].clientY;
    var diffY = touchEndY - startY;
    if (diffY >= startHeight * 0.2) {
      requestAnimationFrame(function () {
        hideMenu();
      });
    } else {
      requestAnimationFrame(function () {
        showMenu();
      });
    }
  });
});

// options

var options = document.querySelectorAll(".option");

options.forEach(function (option) {
  option.addEventListener("click", function () {
    options.forEach(function (item) {
      item.classList.remove("selected");
    });
    this.classList.add("selected");
  });
});

var optionsInfo = document.querySelectorAll(".option__info");

optionsInfo.forEach(function (option) {
  option.addEventListener("click", function () {
    option.classList.toggle("active");
  });
});

// address delivery
var addressDelivery = document.querySelector(".side-bar__address-info");
var addressDeliveryMenu = document.querySelector("#addressDeliveryMenu");
addressDelivery.addEventListener("click", () => {
  console.log("asjdcn");
  addressDeliveryMenu.classList.toggle("hidden");
  sideBar.classList.toggle("hidden");
  headerMenuButton.classList.toggle("open");
});

var addressMenuOptions = document.querySelectorAll(".address-menu__option");

addressMenuOptions.forEach(function (option) {
  option.addEventListener("click", function () {
    addressMenuOptions.forEach(function (item) {
      item.classList.remove("selected");
    });
    this.classList.add("selected");
  });
});

var optionsInfo = document.querySelectorAll(".option__info");

optionsInfo.forEach(function (option) {
  option.addEventListener("click", function () {
    option.classList.toggle("active");
  });
});
