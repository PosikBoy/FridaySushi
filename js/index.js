window.addEventListener("DOMContentLoaded", () => {
  //Получаем блок для изменения яркости, оболочку приложения и все меню
  const brightness = document?.querySelector(".brightness");
  const wrapper = document?.querySelector(".wrapper");
  const menus = document?.querySelectorAll(".menu");
  //Объявляем переменные состояния экрана
  let realScroll;
  let isModalOpen = false;
  let isScrollDisabled = false;
  let isBrightnessActive = false;
  //Функция блокировки прокрутки. Положение оболочки приложения фиксится(это надо потому что сафари)
  const disableScroll = () => {
    //Проверка на всякий случай
    if (!isScrollDisabled) {
      isScrollDisabled = true;
      // Получаем текущую прокрутку страницы
      realScroll = window.scrollY;
      // Задаем стили для блокировки прокрутки
      wrapper.style.overflow = "hidden";
      wrapper.style.position = "fixed";

      wrapper.style.top = `-${realScroll}px`;
    }
  };
  // Функция для разблокировки прокрутки
  const enableScroll = () => {
    //Проверка на всякий случай
    if (isScrollDisabled) {
      isScrollDisabled = false;

      wrapper.style.overflow = "";
      wrapper.style.position = "";
      wrapper.style.top = "";
      window.scrollTo(0, realScroll);
    }
  };
  //функция, которая закрывает все всплывающие меню, которые помечены классом menu(строка 5)
  const closeAllMenus = () => {
    menus?.forEach((item) => {
      item.classList.remove("active");
    });
    headerMenuButton?.classList.add("active");
    isModalOpen = false;
  };

  //функция, которая открывает определенное меню, убирая класс active
  const showMenu = (menu) => {
    //В случае если хотя бы одно меню открыто, мы его закрываем(на экране не должно быть открыто больше одного меню)
    if (isModalOpen) {
      closeAllMenus();
      toggleBrightness();
    }
    menu?.classList.add("active");
    isModalOpen = true;
  };
  //Функция для того, чтобы делать блок понижения яркости(по которому можно тапать) активным/неактивным
  const toggleBrightness = () => {
    if (isBrightnessActive) {
      setTimeout(() => {
        brightness?.classList.remove("active");
        isBrightnessActive = false;
      }, 200);
    } else {
      brightness?.classList.add("active");
      isBrightnessActive = true;
    }
  };
  //В случае нажатия на темную область, все меню закрываются
  brightness?.addEventListener("touchstart", () => {
    if (isScrollDisabled) {
      enableScroll();
    }
    closeAllMenus();
    addressDeliveryMenu?.classList.remove("opened");
    toggleBrightness();
  });

  /* Начинается блок для работы с категориями товаров.Так как по макету нужно, чтобы появлялась кнопка внутри, мы
  скрываем прошлый блок и показываем новый  (category2)
  Все сделано именно так, потому что сафари*/

  //Получаем все нужные кнопки/листы
  const categoryList = document?.querySelector(".categories__list");
  const category = document?.querySelector(".categories");
  const category2 = document?.querySelector(".categories2");

  //при достижении изначального блока категорий меньше 15 пикселей, то первый блок исчезает и появляется второй, уже с кнопкой.
  window.addEventListener("scroll", () => {
    const rect = categoryList?.getBoundingClientRect();
    if (rect?.top <= 15) {
      category2?.classList.remove("hidden");
      category?.classList.add("hidden");
    } else {
      category2?.classList.add("hidden");
      category?.classList.remove("hidden");
    }
  });
  /*Конец бока для категорий*/

  //Код для выбора города
  //получаем нужный блок и ссылки
  const chooseCity = document?.querySelector(".choose-city");
  const chooseCityLink = document?.querySelectorAll(".choose-city__link");
  //Сразу показываем меню выбора города, так как это изначальное его состояние
  if (chooseCity) {
    showMenu(chooseCity);
    toggleBrightness();
    disableScroll();
  }

  //Закрываем меню выбора города при нажатии на любую ссылку

  /*Как я понимаю, там должен быть переход на другой домен, поэтому
  вряд ли этот код на реальном сайте вообще будет применяться, но 
  мне показать фукнционал надо))*/
  chooseCityLink?.forEach((chooseCityLink) => {
    chooseCityLink.addEventListener("click", (event) => {
      event.preventDefault();
      chooseCity.classList.remove("active");
      closeAllMenus();
      toggleBrightness();
      enableScroll();
      addressDeliveryMenu.classList.remove("hidden");
    });
  });
  //Конец кода для выбора города

  //Начало кода для бокового меню

  //получаем нужный блок и кнопку в шапке страницы

  const sideBar = document?.querySelector(".side-bar");
  const headerMenuButton = document?.querySelector(".header__menu-button");
  const categoryMenuButton = document?.querySelector(
    ".categories__menu-button"
  );
  const sideBarMenuButton = document?.querySelector(".side-bar__menu-button");
  //при нажатии на кнопку в шапке сраницы показываем боковое меню
  headerMenuButton?.addEventListener("click", (event) => {
    event.preventDefault();
    showMenu(sideBar);
    toggleBrightness();
    disableScroll();
    //Убираем кнопку, тк в сайдбаре уже есть своя
    headerMenuButton.classList.remove("active");
  });

  //при нажатии на кнопку в категориях страницы показываем боковое меню

  categoryMenuButton?.addEventListener("click", (event) => {
    event.preventDefault();
    showMenu(sideBar);
    toggleBrightness();
    disableScroll();
    //Убираем кнопку, тк в сайдбаре уже есть своя
    headerMenuButton?.classList.remove("active");
  });

  //при нажатии на кнопку закрытия в сайдбаре убираем боковое меню
  sideBarMenuButton?.addEventListener("click", () => {
    closeAllMenus();
    toggleBrightness();
    enableScroll();
    //Возвращаем кнопку в хедере
    headerMenuButton?.classList.add("active");
  });

  // Начинается код для продуктов

  /*По хорошему надо получать через querySelectorAll и проходится по массиву через foreach
  А затем, на каждое меню навешивать слушатель событий, но
  я не знаю как это будет на битриксе. Вдруг там в страничке будет не сразу монтирование всех карточек на сервере,
  а будет добавление его только при клике, поэтому сделал только демонстрационный
  пример*/
  const sushi = document?.querySelector("#sushi");
  const sushiCard = document?.querySelector("#sushiCard");

  sushi?.addEventListener("click", (event) => {
    showMenu(sushiCard);
    toggleBrightness();
  });

  const productCola = document?.querySelector("#cola");
  const productCardCola = document?.querySelector("#colaCard");

  productCola?.addEventListener("click", (event) => {
    showMenu(productCardCola);
    toggleBrightness();
  });
  // Конец кода для продуктов

  //Начало кода для всех свайпающихся карточек ( карточки товара и тд)
  const swipeMenus = document?.querySelectorAll(".swipe");

  swipeMenus?.forEach((item) => {
    let startY, startBottom, startHeight;
    //Функция обновления положения блока на экране. Вызывается  при каждом движении сенсора
    const updateSwipeMenu = (newBottom) => {
      item.style.bottom = newBottom + "px";
    };
    //Функция для закрытия этого свайпающегося меню.
    const hideSwipeMenu = () => {
      //обнуляем стили, чтобы не было конфликтов
      item.style = "";
      //добавляем анимацию
      item.style.transition = "all 0.3s ease";
      closeAllMenus();
      toggleBrightness();
      //убираем анимацию, чтобы не было конфликтов при следующем вызове меню через 300мс(длительность анимации)
      setTimeout(() => {
        item.style = "";
      }, 300);
    };
    //Функция для открытия этого свайпающегося меню. Вызывается в случае свайпа меньше 20% от высоты меню
    const showSwipeMenu = () => {
      //Убираем стили, чтобы не было конфликтов
      item.style = "";
      //добавляем анимацию и перемещаем меню обратно
      item.style.transition = "bottom 0.3s ease";
      item.style.bottom = "0";
      //Убираем стили, чтобы не было конфликтов
      setTimeout(() => {
        item.style = "";
      }, 300);
    };
    //Слушатель события при начале скролла(тап)
    item.addEventListener("touchstart", (e) => {
      startY = e.touches[0].clientY;
      //Убираем анимацию, чтобы не было конфликтов
      item.style.transition = "none";
      //блокируем скролл, чтобы фон не скроллился вместе с менюшкой
      disableScroll();
      if (!e.target.classList.contains("option__icon")) {
        info?.forEach((option) => {
          option.classList.remove("active");
        });
      }

      startBottom = parseInt(
        window.getComputedStyle(item).getPropertyValue("bottom")
      );
      startHeight = item.offsetHeight;
    });

    //Слушатель события при перемещении скролла(свайп)

    item.addEventListener("touchmove", (e) => {
      //Выключаем всплытие для сафари
      e.stopPropagation();
      let currentY = e.touches[0].clientY;
      let diff = currentY - startY;
      let newBottom = startBottom - diff;

      //Тут идет проверка на то, чтобы пользователь не мог просвайпать меню выше чем надо и ниже чем надо
      if (newBottom >= -startHeight && newBottom <= 0) {
        updateSwipeMenu(newBottom);
      }
    });

    //Слушатель события при конце скролла(отпустил меню)
    item.addEventListener("touchend", (e) => {
      let touchEndY = e.changedTouches[0].clientY;
      let diffY = touchEndY - startY;
      //Разрешаем скролл фона
      enableScroll();
      //Если длина свайпа больше 20% высота, то закрываем меню, иначе возвращаем в изначальное положение
      if (diffY >= startHeight * 0.2) {
        hideSwipeMenu();
      } else {
        showSwipeMenu();
      }
    });
  });

  //Код для выбора опций в карточках товара
  const options = document?.querySelectorAll(".product-card__option");
  const info = document?.querySelectorAll(".product-card__info");
  //При клике на опцию убираем класс selected со всех опций и добавляем той, на которую кликнули
  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((item) => {
        item.classList.remove("selected");
      });
      option.classList.add("selected");
    });
  });
  //info - блок с калориями, белками и тд. При клике на него, добавляем/убираем класс active.Далее меню показывается с помощью наследования в css
  info?.forEach((option) => {
    option.addEventListener("click", () => {
      option.classList.toggle("active");
    });
  });

  // Код для выбора адреса доставки

  const addressDeliveryMenu = document?.querySelector("#addressDeliveryMenu");
  //При нажатии на кнопку, вызываем нужное меню(кнопка в сайдбаре)
  const addressDeliveryOpenBtn = document?.querySelector(".address-menu__open");
  const addressMenuBtn = document?.querySelector(".address-menu__button");
  const cartBlock = document?.querySelector(".cart");
  addressMenuBtn?.addEventListener("click", () => {
    addressDeliveryMenu.classList.add("hidden");
    cartBlock.classList.add("active");
    toggleBrightness();
  });
  addressDeliveryOpenBtn?.addEventListener("click", () => {
    addressDeliveryMenu.classList.add("opened");
    toggleBrightness();

    let startY, startBottom, startHeight;
    //Функция обновления положения блока на экране. Вызывается  при каждом движении сенсора
    const updateSwipeMenu = (newBottom) => {
      addressDeliveryMenu.style.bottom = newBottom + "px";
    };
    //Функция для закрытия этого свайпающегося меню.
    const hideSwipeMenu = () => {
      //обнуляем стили, чтобы не было конфликтов
      addressDeliveryMenu.style = "";
      //добавляем анимацию
      addressDeliveryMenu.style.transition = "all 0.3s ease";

      addressDeliveryMenu.classList.remove("opened");
      toggleBrightness();

      addressDeliveryMenu.removeEventListener("touchstart", touchStartListener);
      addressDeliveryMenu.removeEventListener("touchmove", touchMoveListener);
      addressDeliveryMenu.removeEventListener("touchend", touchEndListener);

      //убираем анимацию, чтобы не было конфликтов при следующем вызове меню через 300мс(длительность анимации)
      setTimeout(() => {
        addressDeliveryMenu.style = "";
      }, 300);
    };
    //Функция для открытия этого свайпающегося меню. Вызывается в случае свайпа меньше 20% от высоты меню
    const showSwipeMenu = () => {
      //Убираем стили, чтобы не было конфликтов
      addressDeliveryMenu.style = "";
      //добавляем анимацию и перемещаем меню обратно
      addressDeliveryMenu.style.transition = "bottom 0.3s ease";
      addressDeliveryMenu.style.bottom = "0";
      //Убираем стили, чтобы не было конфликтов
      setTimeout(() => {
        addressDeliveryMenu.style = "";
      }, 300);
    };
    let touchStartListener = (e) => {
      startY = e.touches[0].clientY;
      //Убираем анимацию, чтобы не было конфликтов
      addressDeliveryMenu.style.transition = "none";
      //блокируем скролл, чтобы фон не скроллился вместе с менюшкой
      disableScroll();
      if (!e.target.classList.contains("option__icon")) {
        info?.forEach((option) => {
          option.classList.remove("active");
        });
      }

      startBottom = parseInt(
        window.getComputedStyle(addressDeliveryMenu).getPropertyValue("bottom")
      );
      startHeight = addressDeliveryMenu.offsetHeight;
    };
    //Слушатель события при начале скролла(тап)
    addressDeliveryMenu.addEventListener("touchstart", touchStartListener);

    //Слушатель события при перемещении скролла(свайп)
    let touchMoveListener = (e) => {
      //Выключаем всплытие для сафари
      e.stopPropagation();
      let currentY = e.touches[0].clientY;
      let diff = currentY - startY;
      let newBottom = startBottom - diff;

      //Тут идет проверка на то, чтобы пользователь не мог просвайпать меню выше чем надо и ниже чем надо
      if (newBottom >= -startHeight && newBottom <= 0) {
        updateSwipeMenu(newBottom);
      }
    };
    addressDeliveryMenu.addEventListener("touchmove", touchMoveListener);
    //Слушатель события при конце скролла(отпустил меню)
    let touchEndListener = (e) => {
      let touchEndY = e.changedTouches[0].clientY;
      let diffY = touchEndY - startY;
      //Разрешаем скролл фона
      enableScroll();
      //Если длина свайпа больше 20% высота, то закрываем меню, иначе возвращаем в изначальное положение
      if (diffY >= startHeight * 0.2) {
        hideSwipeMenu();
      } else {
        showSwipeMenu();
      }
    };

    addressDeliveryMenu.addEventListener("touchend", touchEndListener);
  });
  const addressMenuOptions = document?.querySelectorAll(
    ".address-menu__option"
  );
  //При клике на опцию убираем класс selected со всех опций и добавляем той, на которую кликнули
  addressMenuOptions?.forEach((option) => {
    option.addEventListener("click", () => {
      addressMenuOptions.forEach((item) => {
        item.classList.remove("selected");
      });
      option.classList.add("selected");
    });
  });
  const addressSelectionBtn = document.querySelector(
    ".address-menu__address-selection"
  );
  const myAdressesModalMenu = document.querySelector(".my-addresses");
  addressSelectionBtn?.addEventListener("click", () => {
    disableScroll();
    closeAllMenus();
    showMenu(myAdressesModalMenu);
    toggleBrightness();
  });
  const myAddressBackBtn = document.querySelector(".my-addresses__back-button");
  myAddressBackBtn?.addEventListener("click", () => {
    closeAllMenus();
    enableScroll();
  });

  const myAddressesOptions = document.querySelectorAll(".my-addresses__option");
  myAddressesOptions?.forEach((option) => {
    option.addEventListener("click", () => {
      myAddressesOptions.forEach((item) => {
        item.classList.remove("selected");
      });
      option.classList.add("selected");
    });
  });
  const deleteButtons = document?.querySelectorAll(".my-addresses__delete");
  const modalMenu = document?.querySelector(".modal-menu");
  deleteButtons?.forEach((item) => {
    item.addEventListener("click", (event) => {
      modalMenu.classList.add("active");
    });
  });

  const deleteButton = document?.querySelector(".modal-menu__delete-button");
  const cancelButton = document?.querySelector(".modal-menu__cancel-button");

  deleteButton?.addEventListener("click", (event) => {
    modalMenu.classList.remove("active");
  });
  cancelButton?.addEventListener("click", (event) => {
    modalMenu.classList.remove("active");
  });

  const pickupSelectionBtn = document.querySelector(
    ".address-menu__pickup-selection"
  );
  const pickupSelectionMenu = document?.querySelector(".pickup-selection");
  const pickupSelectionOptions = document?.querySelectorAll(
    ".pickup-selection__option"
  );
  pickupSelectionBtn?.addEventListener("click", () => {
    disableScroll();
    closeAllMenus();
    showMenu(pickupSelectionMenu);
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
    closeAllMenus();
    enableScroll();
  });
});
