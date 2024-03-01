function resizeWishes() {
  const textarea = document.getElementById("wishesTextarea");
  textarea.style.height = "auto"; // Сброс высоты на автоматическую
  textarea.style.height = textarea.scrollHeight + "px"; // Установка высоты textarea в соответствии с содержимым
}

function resizeComment() {
  const textarea = document.getElementById("commentTextarea");
  textarea.style.height = "auto"; // Сброс высоты на автоматическую
  textarea.style.height = textarea.scrollHeight + "px"; // Установка высоты textarea в соответствии с содержимым
}
