"use strict";

const themeBtn = document.querySelector(".theme");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const percentBtn = document.querySelector(".percentage");
const posNegBtn = document.querySelector(".pos-neg");
const decimalBtn = document.querySelector(".decimal");
const clearBtn = document.querySelector(".clear");
const backspaceBtn = document.querySelector(".delete");
let display = document.getElementById("main-display");
let equation = document.querySelector(".equation");

function toggleTheme() {
  const doc = document.body;
  doc.classList.toggle("light-theme");
}

function allClear() {
  document.querySelector(".display").scrollTo(0, 0);
  display.textContent = 0;
}

function backspace() {
  if (display.textContent.length === 1) {
    display.textContent = 0;
  } else {
    display.textContent = display.textContent.slice(0, (display.textContent.length - 1));
  }
}

function displayDigits(e) {
  if (display.textContent.length < 16) {
    display.textContent = `${display.textContent}` + `${e.target.textContent}`;
  }
  if (display.textContent.startsWith("0") && display.textContent.length > 1) {
    display.textContent = display.textContent.slice(1);
  }
}

digits.forEach((digits) => {
  digits.addEventListener("click", displayDigits)
})

operators.forEach((operators) => {
  operators.addEventListener("click", (e) => {
    console.log(e.target.textContent);
  })
})

clearBtn.addEventListener("click", allClear)
window.addEventListener("keydown", (e) => {
  if (e.key === "c") {
    allClear();
  }
})

backspaceBtn.addEventListener("click", backspace)
window.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    backspace();
  }
})

themeBtn.addEventListener("click", toggleTheme)
window.addEventListener("keydown", (e) => {
  if (e.key === "t") {
    toggleTheme();
  }
})