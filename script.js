"use strict";

const themeBtn = document.querySelector(".theme");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
let display = document.querySelector(".main-display");
let equation = document.querySelector(".equation");

function toggleTheme() {
  const doc = document.body;
  doc.classList.toggle("light-theme");
}

digits.forEach((digits) => {
  digits.addEventListener("click", (e) => {
    console.log(e.target.textContent);
  })
})

operators.forEach((operators) => {
  operators.addEventListener("click", (e) => {
    console.log(e.target.textContent);
  })
})

themeBtn.addEventListener("click", toggleTheme)