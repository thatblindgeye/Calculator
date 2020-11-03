"use strict";

const themeBtn = document.querySelector(".theme");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const percentBtn = document.querySelector(".percentage");
const posNegBtn = document.querySelector(".pos-neg");
const decimalBtn = document.querySelector(".decimal");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const backspaceBtn = document.querySelector(".delete");
let display = document.getElementById("main-display");
let equation = document.querySelector(".equation");
let operandA = "";
let operandB = "";
let operator = "";

function toggleTheme() {
  const doc = document.body;
  doc.classList.toggle("light-theme");
}

function toggleNegative() {
  display.value *= -1;
}

function clearAll() {
  display.value = "0";
  equation.value = "";
  operandA = "";
  operandB = "";
  operator = "";
}

function backspace() {
  if (display.value.length === 1) {
    display.value = 0;
  } else {
    display.value = display.value.slice(0, (display.value.length - 1));
  }
}

function addDecimal() {
  if (display.value.includes(".")) return;
  display.value += ".";
}

function inputNumber(e) {
  if (display.value.length < 16) {
    if (e.button === 0) {
      display.value += e.target.textContent;
    } else {
      display.value += e.key;
    }
  }
  if (display.value.startsWith("0") && !display.value.startsWith("0.")) {
    display.value = display.value.slice(1);
  }
}

function inputOperator(e) {
  if (!operandB) {
    operandA = Number(display.value);
    if (e.button === 0) {
      operator = e.target.textContent;
      equation.value = operandA + " " + operator;
    } else if (e.key) {
      operator = e.key;
      equation.value = operandA + " " + operator;
    }
  } else {
    operate();
  }
  display.value = 0;
}

window.addEventListener("load", clearAll)

digitBtns.forEach((digitBtns) => {
  digitBtns.addEventListener("click", inputNumber)
})
window.addEventListener("keydown", (e) => {
  if (isFinite(e.key)) {
    inputNumber(e);
  }
})

operatorBtns.forEach((operatorBtns) => {
  operatorBtns.addEventListener("click", inputOperator)
})
window.addEventListener("keydown", (e) => {
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    inputOperator(e);
  }
})

clearBtn.addEventListener("click", clearAll)
window.addEventListener("keydown", (e) => {
  if (e.key === "c") {
    clearAll();
  }
})

backspaceBtn.addEventListener("click", backspace)
window.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    backspace();
  }
})

posNegBtn.addEventListener("click", toggleNegative)
window.addEventListener("keydown", (e) => {
  if (e.key === "n") {
    toggleNegative();
  }
})

decimalBtn.addEventListener("click", addDecimal)
themeBtn.addEventListener("click", toggleTheme)
window.addEventListener("keydown", (e) => {
  if (e.key === ".") {
    addDecimal();
  }
})

themeBtn.addEventListener("click", toggleTheme)
window.addEventListener("keydown", (e) => {
  if (e.key === "t") {
    toggleTheme();
  }
})