"use strict";

let display = document.getElementById("main-display");
let equation = document.querySelector(".equation");
let operandA = "";
let operandB = "";
let operator = "";
let result = "";

function add(operator, num1, num2) {
  return parseFloat(num1) + parseFloat(num2);
}

function subtract(operator, num1, num2) {
  return parseFloat(num1) - parseFloat(num2);
}

function divide(operator, num1, num2) {
  if (num2 === "0") {
    return "ERROR";
  } else {
    return parseFloat(num1) / parseFloat(num2);
  }
}

function multiply(operator, num1, num2) {
  return parseFloat(num1) * parseFloat(num2);
}

function clearAll() {
  display.value = "0";
  equation.value = "";
  operandA = "";
  operandB = "";
  operator = "";
  result = "";
}

function backspace() {
  if (result) return;
  if (display.value.length === 1) {
    display.value = 0;
  } else {
    display.value = display.value.slice(0, (display.value.length - 1));
  }
}

function makePercent() {
  if (result === "ERROR") return;
  result = display.value / 100;
  if (result.toString().length > 16) {
    display.value = result.toPrecision(1);
  } else {
    display.value = result;
  }
}

function toggleNegative() {
  if (result === "ERROR") return;
  display.value *= -1;
}

function addDecimal() {
  if (result === "ERROR") return;
  if (display.value.includes(".")) return;
  display.value += ".";
}

function inputNumber(e) {
  if (display.value.length === 16) return;
  if (result) clearAll();
  if (e.button === 0) {
    display.value += e.target.textContent;
  } else {
    display.value += e.key.replace(" ","");
  }
  if (display.value.startsWith("0") && !display.value.startsWith("0.")) {
    display.value = display.value.slice(1);
  } 
}

function inputOperator(e) {
  if (result === "ERROR") return;
  operandA = display.value;
  if (e.button === 0) {
      operator = e.target.textContent;
      equation.value = operandA + " " + operator;
      display.value = 0;
  } else {
      operator = e.key;
      equation.value = operandA + " " + operator;
      display.value = 0;
    }
}

function operate() {
  if (result === "ERROR") return;
  if (operandB === "") {
    operandB = display.value;
  } else {
    operandA = display.value;
  }
  equation.value = operandA + " " + operator + " " + operandB + " =";
  switch (operator) {
    case "+":
      result = add(operator, operandA, operandB);
      break;
    case "-":
      result = subtract(operator, operandA, operandB);
      break;
    case "/":
      result = divide(operator, operandA, operandB);
      break;
    case "*":
      result = multiply(operator, operandA, operandB);
      break;
    default:
      result = "ERROR";
  }
}

function checkResult() {
  if (isFinite(result) && result.toString().length > 16) {
    display.value = result.toPrecision(1);
  } else {
      display.value = result;
    }
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
}


window.addEventListener("load", clearAll)

document.querySelectorAll(".digit").forEach(btn => {
  btn.addEventListener("click", (e) => {
    inputNumber(e);
  })
})
window.addEventListener("keydown", (e) => {
  if (isFinite(parseFloat(e.key))) {
    inputNumber(e);
    console.log(typeof(e.key));
  }
})

document.querySelectorAll(".operator").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    inputOperator(e);
  })
})
window.addEventListener("keydown", (e) => {
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    e.preventDefault("/"); // prevents Quick Find from launching in Firefox
    inputOperator(e);
  }
})

document.querySelector(".equal").addEventListener("click", () => {
  if (operandA === "") return;
  operate();
  checkResult();
})
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault("Enter"); // prevents duplicate input if a button has focus from a mouse click
    if (operandA === "") return;
    operate();
    checkResult();
  }
})

document.querySelector(".clear").addEventListener("click", clearAll)
window.addEventListener("keydown", (e) => {
  if (e.key === "c" || e.key === "C") {
    clearAll();
  }
})

document.querySelector(".delete").addEventListener("click", backspace)
window.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    e.preventDefault("Backspace"); // prevents browser from navigating back one page
    backspace();
  }
})

document.querySelector(".pos-neg").addEventListener("click", toggleNegative)
window.addEventListener("keydown", (e) => {
  if (e.key === "n" || e.key === "N") {
    toggleNegative();
  }
})

document.querySelector(".decimal").addEventListener("click", addDecimal)
window.addEventListener("keydown", (e) => {
  if (e.key === ".") {
    addDecimal();
  }
})

document.querySelector(".percentage").addEventListener("click", makePercent)
window.addEventListener("keydown", (e) => {
  if (e.key === "%") {
    makePercent();
  }
})

document.querySelector(".theme").addEventListener("click", toggleTheme)
window.addEventListener("keydown", (e) => {
  if (e.key === "t" || e.key === "T") {
    toggleTheme();
  }
})