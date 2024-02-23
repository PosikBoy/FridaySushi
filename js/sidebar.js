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
      }, 300);
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
    toggleBrightness();
  });
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

  sideBarMenuButton?.addEventListener("click", () => {
    closeAllMenus();
    toggleBrightness();
    enableScroll();
    //Возвращаем кнопку в хедере
    headerMenuButton?.classList.add("active");
  });
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

  // Код для выбора адреса доставки

  const addressDelivery = document?.querySelector(".side-bar__address-info");
  const addressDeliveryMenu = document?.querySelector("#addressDeliveryMenu");
  //При нажатии на кнопку, вызываем нужное меню(кнопка в сайдбаре)
  addressDelivery?.addEventListener("click", () => {
    closeAllMenus();
    showMenu(addressDeliveryMenu);
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
});
