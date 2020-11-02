"use strict";

const themeBtn = document.querySelector(".theme");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const disableable = document.querySelectorAll(".disableable");
let output = document.querySelector(".main-display");
let input = document.querySelector(".equation");

function toggleTheme() {
  const doc = document.body;
  doc.classList.toggle("light-theme");
}

(function checkOutputLength() {
  if (output.textContent.length > 16) {
    output.textContent = "Error: character limit";
    output.style.fontSize = "1.2rem";
  }
})();

(function checkInputLength() {
  if (input.textContent.length === 30) {
      disableable.forEach((disableable) => {
      disableable.setAttribute("disabled", true);
    })
  }
})();

themeBtn.addEventListener("click", toggleTheme)