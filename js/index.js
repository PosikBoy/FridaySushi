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
const menuBurger = document.querySelector(".menu-button__burger");

headerMenuButton.addEventListener("click", function (event) {
  event.preventDefault();
  body.classList.toggle("inactive");
  headerMenuButton.classList.toggle("open");
  menuBurger.classList.toggle("open");
  sideBar.classList.toggle("hidden");
  toggleBrightness();
});
categoryMenuButton.addEventListener("click", function (event) {
  event.preventDefault();
  body.classList.toggle("inactive");
  headerMenuButton.classList.toggle("open");
  menuBurger.classList.toggle("open");
  sideBar.classList.toggle("hidden");
  toggleBrightness();
});

// product card
const product = document.querySelector(".sushi__product");
const productCard = document.querySelector(".product-card");

product.addEventListener("click", (event) => {
  toggleBrightness();
  productCard.classList.toggle("hidden");
  body.classList.add("inactive");
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
