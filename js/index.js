var bright80 = document.querySelector(".bright80");
const wrapper = document.querySelector(".wrapper");
const menus = document.querySelectorAll(".menu");
let realScroll;
function disableScroll() {
  // Получаем текущую прокрутку страницы
  realScroll = window.scrollY;
  // Задаем стили для блокировки прокрутки
  wrapper.style.overflow = "hidden";
  wrapper.style.position = "fixed";
  wrapper.style.top = `-${realScroll}px`;
  console.log(scrollY);
}

// Функция для разблокировки прокрутки
function enableScroll() {
  // Получаем значение текущей прокрутки страницы, которое мы предварительно сохраняли
  // Удаляем стили блокировки прокрутки
  wrapper.style.overflow = "";
  wrapper.style.position = "";
  wrapper.style.top = "";
  console.log(realScroll);
  // Прокручиваем страницу на сохраненное значение
  window.scrollTo(0, realScroll);
}
const showMenu = (menu) => {
  bright80.classList.add("active");
  menu?.classList.remove("hidden");
  bright80.addEventListener("click", hideMenu);
  disableScroll();
};

const hideMenu = () => {
  bright80.classList.remove("active");
  //скрываем все меню, при нажатии на крестик или область с пониженной яркостью
  menus.forEach((item) => {
    item.classList.add("hidden");
    item.style = "";
  });
  sideBarMenuButton.classList.remove("open");
  headerMenuButton.classList.remove("hidden");
  bright80.removeEventListener("click", hideMenu);
  enableScroll();
};
bright80.addEventListener("click", () => {
  hideMenu();
});
// Конец кода для понижения яркости экрана при

// Начало кода для кнопки, которая повляется в категориях товаров.
var categoryList = document.querySelector(".categories__list");
var category = document.querySelector(".categories");
var category2 = document.querySelector(".categories2");

window.addEventListener("scroll", function () {
  var rect = categoryList.getBoundingClientRect();
  if (rect.top <= 10) {
    category2.classList.remove("hidden");
    category.classList.add("hidden");
  } else {
    category2.classList.add("hidden");
    category.classList.remove("hidden");
  }
});
// Конец кода для кнопки, которая повялется в категориях товаров.

//Начало кода для выбора города
const chooseCity = document.querySelector(".choose-city");
const chooseCityLink = document.querySelectorAll(".choose-city__link");

chooseCity.classList.add("active");
showMenu();

chooseCityLink.forEach(function (chooseCityLink) {
  chooseCityLink.addEventListener("click", function (event) {
    event.preventDefault();
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
  showMenu(sideBar);
  headerMenuButton.classList.add("hidden");
  sideBarMenuButton.classList.add("open");
});

var categoryMenuButton = document.querySelectorAll(".categories__menu-button");
var sideBarMenuButton = document.querySelector(".side-bar__menu-button");
categoryMenuButton.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    showMenu(sideBar);
    headerMenuButton.classList.add("hidden");
    sideBarMenuButton.classList.add("open");
  });
});

sideBarMenuButton.addEventListener("click", () => {
  hideMenu();
});

// product card
const sushi = document.querySelector("#sushi");
const sushiCard = document.querySelector("#sushiCard");

sushi.addEventListener("click", (event) => {
  showMenu(sushiCard);
});

const productCola = document.querySelector("#cola");
const productCardCola = document.querySelector("#colaCard");

productCola.addEventListener("click", (event) => {
  showMenu(productCardCola);
});

const swipeMenus = document.querySelectorAll(".swipe");

swipeMenus.forEach((item) => {
  var startY, startBottom, startHeight;
  var menuVisible = true;
  function updateSwipeMenu(newBottom) {
    item.style.bottom = newBottom + "px";
  }
  function disableScroll() {
    wrapper.style.overflow = "hidden";
    wrapper.style.position = "fixed";
    wrapper.style.top = `-${realScroll}px`;
  }
  function enableScroll() {
    wrapper.style.overflow = "";
    wrapper.style.position = "";
    wrapper.style.top = "";
    window.scrollTo(0, realScroll);
  }
  function hideSwipeMenu() {
    item.style = "";
    item.style.transition = "bottom 0.5s ease";
    hideMenu(item);

    menuVisible = false;
    setTimeout(() => {
      item.style = "";
    }, 500);
  }
  function showSwipeMenu() {
    item.style.transition = "bottom 0.3s ease";
    item.style.bottom = "0";
    z;
    menuVisible = true;
  }
  item.addEventListener("touchstart", function (e) {
    startY = e.touches[0].clientY;
    item.style.transition = "none";
    disableScroll();
    startBottom = parseInt(
      window.getComputedStyle(item).getPropertyValue("bottom")
    );
    startHeight = item.offsetHeight;
  });
  item.addEventListener("touchmove", function (e) {
    e.stopPropagation();
    item.style.transition = "none";
    var currentY = e.touches[0].clientY;
    var diff = currentY - startY;
    var newBottom = startBottom - diff;
    if (newBottom >= -startHeight && newBottom <= 0) {
      updateSwipeMenu(newBottom);
    }
  });
  item.addEventListener("touchend", function (e) {
    var touchEndY = e.changedTouches[0].clientY;
    var diffY = touchEndY - startY;
    enableScroll();
    if (diffY >= startHeight * 0.2) {
      hideSwipeMenu();
    } else {
      showSwipeMenu();
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

var info = document.querySelectorAll(".info");

info.forEach(function (option) {
  option.addEventListener("click", function () {
    option.classList.toggle("active");
  });
});

// address delivery
var addressDelivery = document.querySelector(".side-bar__address-info");
var addressDeliveryMenu = document.querySelector("#addressDeliveryMenu");
addressDelivery.addEventListener("click", () => {
  hideMenu();
  showMenu(addressDeliveryMenu);
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

const preventDefault = (event) => {
  event.preventDefault();
};

const productsBlock = document.querySelector(".products");
productsBlock.style.paddingBottom = 80 * orders.length + "px";
orders.forEach((item, index) => {
  let statusInfoIcon = statusInfoIconArray[index];
  let initialHeight = item.clientHeight;
  let initialBottom = -(initialHeight - (index + 1) * 70 - 60);
  item.style.bottom = initialBottom + "px";
  var startY, startBottom;
  var menuVisible = true;
  function checkWrapper() {
    let flag = 0;
    orders.forEach((item) => {
      if (item.classList.contains("active")) {
        flag += 1;
      }
    });
    return flag;
  }
  function updateMenu(newBottom) {
    item.style.bottom = newBottom + "px";
  }
  function hideMenu() {
    item.style.transition = "bottom 0.5s ease";
    item.style.bottom = initialBottom + "px";
    item.classList.remove("active");
    if (!checkWrapper()) {
      ordersWrapper.classList.remove("active");
    }
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
    item.classList.add("active");
    ordersWrapper.classList.add("active");
    statusInfoIcon.classList.add("hidden");
  }
  item.addEventListener("touchstart", function (e) {
    startY = e.touches[0].clientY;
    item.style.transition = "none";
    disableScroll();
    startBottom = parseInt(
      window.getComputedStyle(item).getPropertyValue("bottom")
    );
  });
  item.addEventListener("touchmove", function (e) {
    e.stopPropagation();
    item.style.transition = "none";
    var currentY = e.touches[0].clientY;
    var diff = currentY - startY;
    var newBottom = startBottom - diff;
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
    enableScroll();
  });
});
