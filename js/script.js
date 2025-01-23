const display = document.getElementById('display');
let currentOperand = '';
let previousOperand = '';
let operation = undefined;

// Function to append numbers
function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand = currentOperand.toString() + number.toString();
  updateDisplay();
}

// Function to update the display
function updateDisplay() {
  display.textContent = currentOperand || '0';
}

// Function to handle operations
function chooseOperation(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '') calculate();
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
}

// Perform the calculation
function calculate() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
    default:
      return;
  }
  currentOperand = computation;
  operation = undefined;
  previousOperand = '';
}

// Clear the calculator
function clear() {
  currentOperand = '';
  previousOperand = '';
  operation = undefined;
  updateDisplay();
}

// Delete the last digit
function deleteLast() {
  currentOperand = currentOperand.toString().slice(0, -1);
  updateDisplay();
}

// Event listeners
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const number = button.dataset.number;

    if (number) appendNumber(number);
    if (action === 'add') chooseOperation('+');
    if (action === 'subtract') chooseOperation('-');
    if (action === 'multiply') chooseOperation('*');
    if (action === 'divide') chooseOperation('/');
    if (action === 'equals') calculate() || updateDisplay();
    if (action === 'clear') clear();
    if (action === 'delete') deleteLast();
    if (action === 'decimal') appendNumber('.');
  });
});
