"use strict";

const display = document.getElementById("main-display");
const equation = document.querySelector(".equation");
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
    return "ERROR: division by zero";
  } else {
    return parseFloat(num1) / parseFloat(num2);
  }
}

function multiply(operator, num1, num2) {
  return parseFloat(num1) * parseFloat(num2);
}

function resizeFont() {
  let size = 2.5;
  let defaultWidth = document.querySelector(".display-container").scrollWidth;
  display.style.fontSize = (`${size}` + "rem").toString()
  while (display.scrollWidth > defaultWidth) {
    size = (size - 0.1).toFixed(2);
    display.style.fontSize = (`${size}` + "rem").toString()
  }
}

function toggleHistory() {
  if (document.getElementById("history-container").style.display === "flex") {
    document.getElementById("history-container").style.display = "none";
    document.querySelector(".history").innerHTML = "History";
    document.querySelector(".history").blur();
  } else {
    document.getElementById("history-container").style.display = "flex";
    document.querySelector(".history").innerHTML = "Close";
    document.querySelector(".history").focus();
  }
}

function addHistory() {
  let historyItems = document.getElementsByClassName("history-item");
  let historyList = document.querySelector(".history-list");
  let newHistory = document.createElement("p");
  newHistory.className = "history-item";
  newHistory.textContent = operandA + " " + operator + " " + operandB + " = " + result;
  if (historyItems.length === 0) {
    historyList.appendChild(newHistory);
  } else if (historyItems.length < 20) {
    historyList.insertBefore(newHistory, historyItems[0]);
  } else {
    historyList.removeChild(historyList.childNodes[20]);
    historyList.insertBefore(newHistory, historyItems[0]);
  }
}

function inputNumber(e) {
  let inputType;
  if (active === false && result !== "") clearAll(); // clears after using =/Enter followed by a digit
  if (display.value.replace(".", "").length < 15) {
    inputType = e.button === 0 ? display.value += e.target.textContent : display.value += e.key;
  }
  if (display.value.startsWith("0") && !display.value.includes(".") && display.value.length > 1) {
    display.value = display.value.slice(1);
  }
  resizeFont();
}

// assigns operands depending on whether operator button/key is pressed or =/Enter is
function checkOperands(e) {
  if (result.toString().includes("ERROR") || display.value === "") return;
  if (e.target.textContent !== "=" && e.key !== "Enter") {
    // when stringing operations without pressing =/Enter, i.e. 1 + 2 + 3...
    if (operandA && active) {
      operandB = display.value;
      operate();
      checkResult();
      operandA = result;
      result = "";
    } else {
        operandA = display.value;
        result = "";
    }
  } else {
    // for new operation or after pressing  =/Enter following strung operations, i.e. 1 + 2 + 3 =
    if (operandB === "" || operandA && operandB && active) {
      operandB = display.value;
      // pressing operator key/button after having pressed =/Enter, i.e. 1 + 2 = 3 +
    } else if (operandB && active === false) {
      operandA = result;
      result = "";
    }
  }
}

function inputOperator(e) {
  let inputType;
  if (result.toString().includes("ERROR") || operandA === "" && display.value === "") return;
  inputType = e.button === 0 ? operator = e.target.textContent : operator = e.key;
  display.value = "";
  active = true;
  equation.textContent = operandA + " " + operator;
}

function operate() {
  if (result.toString().includes("ERROR")) return;
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
      result = "ERROR: unknown";
  }
  equation.textContent = operandA + " " + operator + " " + operandB + " =";
}

function checkResult() {
  let resultArray;
  let roundedResult;
  if (isFinite(result) && result.toString().length > 16) {
    result = result.toPrecision(5);
  }
  if (isFinite(result) && result.toString().includes("e")) {
    resultArray = result.toString().split("e");
    roundedResult = parseFloat(Number(resultArray[0]).toFixed(10));
    result = roundedResult + "e" + resultArray[1];
  } 
  display.value = result;
  resizeFont();
  addHistory();
}

function clearAll() {
  display.value = "";
  display.placeholder = "0";
  equation.textContent = "";
  operandA = "";
  operandB = "";
  operator = "";
  result = "";
  resizeFont();
}

function backspace() {
  if (result) return;
  if (display.value.length === 1) {
    display.value = "";
    display.placeholder = "0";
  } else {
    display.value = display.value.slice(0, (display.value.length - 1));
  }
  resizeFont();
}

function makePercent() {
  if (result.toString().includes("ERROR") || !display.value) return;
  operandA = display.value;
  operator = "%";
  operandB = "";
  result = parseFloat(operandA / 100);
  equation.textContent = "";
  checkResult();
  resizeFont();
  addHistory();
}

function toggleNegative() {
  if (result.toString().includes("ERROR") || !display.value) return;
  display.value *= -1;
}

function addDecimal() {
  if (result.toString().includes("ERROR") || !display.value || display.value.includes(".")) return;
  if (active === false && result) clearAll();
  display.value += ".";
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
}


window.addEventListener("load", clearAll)

document.querySelectorAll(".digit").forEach(btn => {
  btn.addEventListener("click", inputNumber)
})
window.addEventListener("keydown", (e) => {
  if (isFinite(parseFloat(e.key))) {
    inputNumber(e);
  }
})

document.querySelectorAll(".operator").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    checkOperands(e);
    inputOperator(e);
  })
})
window.addEventListener("keydown", (e) => {
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    e.preventDefault("/"); // prevents Quick Find from launching in Firefox
    checkOperands(e);
    inputOperator(e);
  }
})

document.querySelector(".equal").addEventListener("click", (e) => {
  if (operandA === "" || display.value === "" || operator === "") return;
  checkOperands(e);
  operate();
  checkResult();
  active = false;
})
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault("Enter"); // prevents duplicate input if a button has focus from a mouse click
    if (operandA === "" || display.value === "" || operator === "") return;
    checkOperands(e);
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

document.querySelector(".percentage").addEventListener("click", (e) => {
  if (operandA && operator && display.value) {
    checkOperands(e);
  }
  makePercent();
  operator = "";
})
window.addEventListener("keydown", (e) => {
  if (e.key === "%") {
    if (operandA && operator && display.value) {
      checkOperands(e);
    }
    makePercent();
    operator = "";
  }
})

document.querySelector(".theme").addEventListener("click", toggleTheme)
window.addEventListener("keydown", (e) => {
  if (e.key === "t" || e.key === "T") {
    toggleTheme();
  }
})

document.querySelector(".history").addEventListener("click", toggleHistory)
window.addEventListener("keydown", (e) => {
  if (e.key === "h" || e.key === "H") {
    toggleHistory();
  }
})

document.querySelector("a").addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
        window.open(e.target.href, "_self");
    }
})