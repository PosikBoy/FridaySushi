document.addEventListener("DOMContentLoaded", () => {
  var discountOption = document.querySelectorAll(".discount__option");

  discountOption.forEach(function (option) {
    option.addEventListener("click", function () {
      discountOption.forEach(function (item) {
        item.classList.remove("selected");
      });
      this.classList.add("selected");
    });
  });

  const promoInput = document.querySelector(".discount__promo-inp");
  const promoInputBlock = document.querySelector(".discount__promo-input");
  const promoButton = document.querySelector(".discount__promo-button");
  const promoDeny = document.querySelector(".discount__promo-deny");
  const promoApplied = document.querySelector(".discount__promo-applied");

  promoInput.addEventListener("input", function (event) {
    console.log("Asdc");
    if (event.target.value) {
      promoInputBlock.classList.add("valid");
    } else {
      promoInputBlock.classList.remove("valid");
    }
  });

  promoButton.addEventListener("click", () => {
    promoDeny.classList.add("active");
    promoInputBlock.classList.remove("valid");
    promoApplied.classList.add("success");
  });
  promoDeny.addEventListener("click", () => {
    promoDeny.classList.remove("active");
    promoInputBlock.classList.add("valid");
    promoApplied.classList.remove("success");
  });

  const bonusInput = document.querySelector(".discount__bonus-inp");
  const bonusInputBlock = document.querySelector(".discount__bonus-input");
  const bonusAll = document.querySelector(".discount__bonus-all");
  const bonusButton = document.querySelector(".discount__bonus-button");
  const bonusDeny = document.querySelector(".discount__bonus-deny");
  const bonusApplied = document.querySelector(".discount__bonus-applied");

  bonusInput.addEventListener("input", function (event) {
    console.log("Asdc");
    if (event.target.value) {
      bonusInputBlock.classList.add("valid");
      bonusAll.classList.add("hidden");
    } else {
      bonusInputBlock.classList.remove("valid");
      bonusAll.classList.remove("hidden");
    }
  });
  bonusButton.addEventListener("click", () => {
    bonusDeny.classList.add("active");
    bonusInputBlock.classList.remove("valid");
    bonusApplied.classList.add("success");
  });
  bonusDeny.addEventListener("click", () => {
    bonusDeny.classList.remove("active");
    bonusInputBlock.classList.add("valid");
    bonusApplied.classList.remove("success");
  });
});
