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

var startY, startBottom, startHeight;
var menuVisible = true;

function updateMenu(newBottom) {
  productCard.style.bottom = newBottom + "px";
}

function hideMenu() {
  productCard.style = "";
  productCard.style.transition = "bottom 0.3s ease";
  productCard.classList.add("hidden");
  menuVisible = false;
  setTimeout(() => {
    productCard.style = "";
  }, 500);
  toggleBrightness();
}

function showMenu() {
  productCard.style.transition = "bottom 0.3s ease";
  productCard.style.bottom = "0";
  menuVisible = true;
}

productCard.addEventListener("touchstart", function (e) {
  startY = e.touches[0].clientY;
  productCard.style.transition = "none";

  startBottom = parseInt(
    window.getComputedStyle(productCard).getPropertyValue("bottom")
  );
  startHeight = productCard.offsetHeight;
});

productCard.addEventListener("touchmove", function (e) {
  productCard.style.transition = "none";
  var currentY = e.touches[0].clientY;
  var diff = currentY - startY;
  var newBottom = startBottom - diff;

  if (newBottom >= -startHeight && newBottom <= 0) {
    requestAnimationFrame(function () {
      updateMenu(newBottom);
    });
  }
});

productCard.addEventListener("touchend", function (e) {
  var touchEndY = e.changedTouches[0].clientY;
  var diffY = touchEndY - startY;

  if (diffY >= startHeight * 0.5) {
    requestAnimationFrame(function () {
      hideMenu();
    });
  } else {
    requestAnimationFrame(function () {
      showMenu();
    });
  }
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
