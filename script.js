"use strict";

const display = document.getElementById("main-display");
const equation = document.querySelector(".equation");
const history = document.getElementById("history-container");
let active = false; // determines if calculator is in an active operation
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

function inputNumber(e) {
  if (display.value.length === 16) return;
  if (active === false && result) clearAll();
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
  if (operandA && active) {
    operate();
    checkResult();
    operandA = result;
    operandB = display.value;
    result = "";
  } else {
      operandA = display.value;
      result = "";
  }
  if (e.button === 0) {
      operator = e.target.textContent;
      display.value = 0;
  } else {
      operator = e.key;
      display.value = 0;
  }
  active = true;
  equation.value = operandA + " " + operator;
}

function operate() {
  if (result === "ERROR") return;
  if (operandB === "" || operandA && operandB && active === true) {
    operandB = display.value;
  } else if (operandB && active === false) {
    operandA = result;
    result = "";
  }
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
  equation.value = operandA + " " + operator + " " + operandB + " =";
  addHistory();
}

function checkResult() {
  if (isFinite(result) && result.toString().length > 16) {
    display.value = result.toPrecision(1);
  } else {
      display.value = result;
  }
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
  equation.value = "";
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
  if (result === "ERROR" || display.value.includes(".")) return;
  if (active === false && result) clearAll();
  display.value += ".";
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
}

function addHistory() {
  let historyItems = document.getElementsByClassName("history-item");
  let historyList = document.querySelector(".history-list");
  let newHistory = document.createElement("p");
  newHistory.className = "history-item";
  newHistory.textContent = operandA + " " + operator + " " + operandB + " = " + result;
  if (historyItems.length === 0) {
    historyList.appendChild(newHistory);
    console.log(historyItems);
  } else if (historyItems.length < 20) {
    historyList.insertBefore(newHistory, historyItems[0]);
  } else {
    historyList.removeChild(historyList.childNodes[20]);
    historyList.insertBefore(newHistory, historyItems[0]);
  }
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
  active = false;
})
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault("Enter"); // prevents duplicate input if a button has focus from a mouse click
    if (operandA === "") return;
    operate();
    checkResult();
    active = false;
  }
})

document.querySelector(".clear").addEventListener("click", clearAll)
window.addEventListener("keydown", (e) => {
  if (e.key === "c" || e.key === "C") {
    clearAll();
  }
})

document.querySelector(".backspace").addEventListener("click", backspace)
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

document.querySelector(".history").addEventListener("click", (e) => {
  if (history.style.display === "flex") {
    history.style.display = "none";
  } else {
    history.style.display = "flex";
  }
})
window.addEventListener("keydown", (e) => {
  if (e.key === "h" || e.key === "H") {
    if (history.style.display === "flex") {
      history.style.display = "none";
    } else {
      history.style.display = "flex";
    }
  }
})