//categories

var categoryList = document.querySelector(".categories__list");
var categoryMenuButton = document.querySelector(".categories__menu-button");
var bright80 = document.querySelector(".bright80");
const menus = document.querySelectorAll(".menu");
//Функции, чтобы затемнять все, что под выезжающими меню и тд.
const showMenu = (menu) => {
  bright80.classList.add("active");
  menu?.classList.remove("hidden");

  bright80.addEventListener("click", () => {
    hideMenu();
  });
};

const hideMenu = () => {
  bright80.classList.remove("active");
  //скрываем все меню, при нажатии на крестик или область с пониженной яркостью
  menus.forEach((item) => {
    item.classList.add("hidden");
    item.style = "";
  });
  headerMenuButton.classList.remove("open");
  bright80.removeEventListener("click", () => {
    hideMenu();
  });
};
bright80.addEventListener("click", () => {
  hideMenu();
});
// Конец кода для понижения яркости экрана при

// Начало кода для кнопки, которая повляется в категориях товаров.
let isMenuButtonShown = false;
function addMenuButton() {
  categoryMenuButton.classList.add("active");
  isMenuButtonShown = true;
}

function removeMenuButton() {
  categoryMenuButton.classList.remove("active");
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
// Конец кода для кнопки, которая повялется в категориях товаров.

//Начало кода для выбора города
const chooseCity = document.querySelector(".choose-city");
const chooseCityLink = document.querySelectorAll(".choose-city__link");
const body = document.querySelector("body");

chooseCity.classList.add("active");
showMenu();

chooseCityLink.forEach(function (chooseCityLink) {
  chooseCityLink.addEventListener("click", function (event) {
    event.preventDefault();
    body.classList.remove("inactive");
    chooseCity.classList.remove("active");
    chooseCity.classList.add("hidden");
    hideMenu();
  });
});
//Конец кода для выбора города

//Начало кода для бокового меню
const sideBar = document.querySelector(".side-bar");
// Var потому что мы используем эту кнопку раньше, в функциях сокрытия и показа менюы
var headerMenuButton = document.querySelector(".header__menu-button");

headerMenuButton.addEventListener("click", function (event) {
  event.preventDefault();
  body.classList.toggle("inactive");
  sideBar.classList.toggle("hidden");
  if (headerMenuButton.classList.contains("open")) {
    headerMenuButton.classList.remove("open");
    hideMenu();
  } else {
    headerMenuButton.classList.add("open");
    showMenu(sideBar);
  }
});
categoryMenuButton.addEventListener("click", function (event) {
  event.preventDefault();
  body.classList.toggle("inactive");
  sideBar.classList.toggle("hidden");
  if (headerMenuButton.classList.contains("open")) {
    headerMenuButton.classList.remove("open");
    hideMenu();
  } else {
    headerMenuButton.classList.add("open");
    showMenu(sideBar);
  }
});

// product card
const sushi = document.querySelector("#sushi");
const sushiCard = document.querySelector("#sushiCard");

sushi.addEventListener("click", (event) => {
  showMenu(sushiCard);
  body.classList.add("inactive");
});

const productCola = document.querySelector("#cola");
const productCardCola = document.querySelector("#colaCard");

productCola.addEventListener("click", (event) => {
  showMenu(productCardCola);
  body.classList.add("inactive");
});

const swipeMenus = document.querySelectorAll(".swipe");

swipeMenus.forEach((item) => {
  var startY, startBottom, startHeight;
  var menuVisible = true;
  function updateSwipeMenu(newBottom) {
    item.style.bottom = newBottom + "px";
  }
  function hideSwipeMenu() {
    item.style = "";
    item.style.transition = "bottom 0.5s ease";
    hideMenu(item);
    body.classList.remove("inactive");
    menuVisible = false;
    setTimeout(() => {
      item.style = "";
    }, 500);
  }
  function showSwipeMenu() {
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
        updateSwipeMenu(newBottom);
      });
    }
  });
  item.addEventListener("touchend", function (e) {
    var touchEndY = e.changedTouches[0].clientY;
    var diffY = touchEndY - startY;
    if (diffY >= startHeight * 0.2) {
      requestAnimationFrame(function () {
        hideSwipeMenu();
      });
    } else {
      requestAnimationFrame(function () {
        showSwipeMenu();
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
  addressDeliveryMenu.classList.toggle("hidden");
  // toggleBrightness();
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

//order

const orders = document.querySelectorAll(".order");
const ordersWrapper = document.querySelector(".orders__wrapper");
let zIndexs = 6;
orders.forEach((item) => {
  item.style.zIndex = zIndexs;
  zIndexs -= 1;
});

ordersWrapper.addEventListener("click", () => {
  orders.forEach((item, index) => {
    let statusInfoIcon = statusInfoIconArray[index];
    let initialBottom = -(item.clientHeight - (index + 1) * 70 - 60);
    item.style.transition = "bottom 0.5s ease";
    statusInfoIcon.classList.remove("hidden");
    item.style.bottom = initialBottom + "px";
    setTimeout(() => {
      item.style.transition = "";
    }, 500);
    ordersWrapper.classList.remove("active");
  });
});

let statusInfoIconArray = document.querySelectorAll(".order__info-icon");

orders.forEach((item, index) => {
  let statusInfoIcon = statusInfoIconArray[index];
  let initialHeight = item.clientHeight;
  let initialBottom = -(initialHeight - (index + 1) * 70 - 60);
  item.style.bottom = initialBottom + "px";
  console.log(initialBottom, initialHeight);
  var startY, startBottom;
  var menuVisible = true;
  function updateMenu(newBottom) {
    item.style.bottom = newBottom + "px";
  }
  function hideMenu() {
    item.style.transition = "bottom 0.5s ease";
    item.style.bottom = initialBottom + "px";
    statusInfoIcon.classList.remove("hidden");
    menuVisible = false;
    setTimeout(() => {
      item.style.transition = "";
    }, 500);
  }
  function showMenu() {
    item.style.transition = "bottom 0.3s ease";
    item.style.bottom = initialBottom + initialHeight - 100 + "px";
    menuVisible = true;
    ordersWrapper.classList.add("active");
    statusInfoIcon.classList.add("hidden");
  }
  item.addEventListener("touchstart", function (e) {
    startY = e.touches[0].clientY;
    item.style.transition = "none";
    body.classList.add("inactive");
    startBottom = parseInt(
      window.getComputedStyle(item).getPropertyValue("bottom")
    );
  });
  item.addEventListener("touchmove", function (e) {
    item.style.transition = "none";
    var currentY = e.touches[0].clientY;
    var diff = currentY - startY;
    var newBottom = startBottom - diff;
    console.log(
      newBottom,
      newBottom >= -startHeight && newBottom <= initialHeight + initialBottom,
      startHeight - initialBottom
    );

    if (
      newBottom >= -initialHeight &&
      newBottom <= initialHeight + initialBottom - 100
    ) {
      requestAnimationFrame(function () {
        updateMenu(newBottom);
      });
    }
  });
  item.addEventListener("touchend", function (e) {
    var touchEndY = e.changedTouches[0].clientY;
    var diffY = touchEndY - startY;

    if (diffY >= initialHeight * 0.2) {
      requestAnimationFrame(function () {
        hideMenu();
      });
    } else {
      requestAnimationFrame(function () {
        showMenu();
      });
    }
    body.classList.remove("inactive");
  });
});

// sideBar.addEventListener("click", (event) => {
//   if (event.target.className != "side-bar__body") {
//     event.preventDefault();
//     body.classList.toggle("inactive");
//     headerMenuButton.classList.toggle("open");
//     sideBar.classList.toggle("hidden");
//     toggleBrightness();
//   }
// });
