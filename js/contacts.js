window.addEventListener("DOMContentLoaded", () => {
  const toggleDelivery = document?.querySelector("#toggleDelivery");
  const togglePickup = document?.querySelector("#togglePickup");
  const deliveryBlock = document?.querySelector(".delivery");
  const pickupBlock = document?.querySelector(".pickup");

  toggleDelivery?.addEventListener("click", (event) => {
    togglePickup?.classList.remove("active");
    toggleDelivery?.classList.add("active");
    pickupBlock?.classList.remove("active");
    deliveryBlock?.classList.add("active");
  });

  togglePickup?.addEventListener("click", (event) => {
    toggleDelivery?.classList.remove("active");
    togglePickup?.classList.add("active");
    deliveryBlock?.classList.remove("active");
    pickupBlock?.classList.add("active");
  });
});
