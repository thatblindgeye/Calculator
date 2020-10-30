"use strict";

let themeBtn = document.querySelector(".theme");

function toggleTheme() {
  const doc = document.body;
  doc.classList.toggle("light-theme");
}

themeBtn.addEventListener("click", toggleTheme)