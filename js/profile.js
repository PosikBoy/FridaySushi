window.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("birth");

  dateInput.addEventListener("input", function (event) {
    const input = event.target;
    const inputValue = input.value.replace(/\D/g, "");
    const inputLength = inputValue.length;

    if (inputLength > 8) {
      input.value = inputValue.slice(0, 8);
    } else if (inputLength > 6) {
      input.value =
        inputValue.slice(0, 2) +
        "." +
        inputValue.slice(2, 4) +
        "." +
        inputValue.slice(4, 8);
    } else if (inputLength > 4) {
      input.value =
        inputValue.slice(0, 2) +
        "." +
        inputValue.slice(2, 4) +
        "." +
        inputValue.slice(4, inputLength);
    } else if (inputLength > 2) {
      input.value =
        inputValue.slice(0, 2) + "." + inputValue.slice(2, inputLength);
    } else {
      input.value = inputValue;
    }
  });

  dateInput.addEventListener("keydown", function (event) {
    const key = event.key;

    if (key === "Backspace") {
      const inputValue = event.target.value.replace(/\D/g, "");

      if (inputValue.length >= 2) {
        event.target.value = inputValue.slice(0, -1);
      } else {
        event.target.value = "";
      }
    }
  });
});
