// Basic math functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Nope!"; // Snarky error message
  }
  return a / b;
}

// Operate function
function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return null;
  }
}

// Variables to store the current state
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;
let currentTerm = "";

// Select elements
const display = document.getElementById("display");
const termDisplay = document.getElementById("term");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");

// Functions to update the display
function updateDisplay(value) {
  if (shouldResetDisplay) {
    display.textContent = value; // Clear the display and start fresh
    shouldResetDisplay = false;
  } else {
    display.textContent =
      display.textContent === "0" ? value : display.textContent + value;
  }

  // Update the term display
  if (currentOperator === null) {
    currentTerm = display.textContent; // Start a new term
  } else {
    currentTerm += value; // Append to the current term
  }
  termDisplay.textContent = currentTerm; // Update the term display

}

function clearDisplay() {
  display.textContent = "0";
  termDisplay.textContent = "";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetDisplay = false;
  currentTerm = "";
}

function deleteLastDigit() {
  display.textContent =
    display.textContent.length > 1
      ? display.textContent.slice(0, -1)
      : "0";
// Update the term display
  currentTerm = currentTerm.slice(0, -1);
  termDisplay.textContent = currentTerm;
}

function roundResult(value) {
  return Math.round(value * 1000) / 1000; // Round to 3 decimal places
}

// Event listeners for digit buttons
digitButtons.forEach((button) =>
  button.addEventListener("click", () => updateDisplay(button.textContent))
);

// Event listeners for operator buttons
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.textContent))
);

// Event listener for equals button
equalsButton.addEventListener("click", evaluate);

// Event listener for clear button
clearButton.addEventListener("click", clearDisplay);

// Event listener for backspace button
backspaceButton.addEventListener("click", deleteLastDigit);

// Set the operator and prepare for the second number
function setOperator(operator) {
  if (currentOperator !== null && shouldResetDisplay) {
    currentOperator = operator; // Replace the operator without evaluating
    currentTerm = currentTerm.slice(0, -1) + operator; // Replace the operator in the term
    termDisplay.textContent = currentTerm;
    return;
  }

  if (currentOperator !== null) evaluate();

  firstNumber = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;

  // Update the term display
  currentTerm += ` ${operator} `;
  termDisplay.textContent = currentTerm;
}

// Perform the calculation
function evaluate() {
  if (currentOperator === null || firstNumber === "" || shouldResetDisplay) {
    display.textContent = "Incomplete input";
    return;
  }

  secondNumber = display.textContent;
  if (secondNumber === "") {
    display.textContent = "Incomplete input";
    return;
  }

  const result = operate(
    currentOperator,
    parseFloat(firstNumber),
    parseFloat(secondNumber)
  );

  display.textContent = roundResult(result);
  firstNumber = result;
  currentOperator = null;
  shouldResetDisplay = true; // Prepare for a new calculation
  
  // Update the term display with the result
  currentTerm += ` = ${roundResult(result)}`;
  termDisplay.textContent = currentTerm;
  currentTerm = ""; // Reset the term for the next calculation
}