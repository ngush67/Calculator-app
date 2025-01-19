// Get references to the display and buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

// Variables to store the current input and calculation state
let currentInput = '';
let operator = null;
let previousInput = '';

// Add event listeners to each button
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (!isNaN(value)) {
      // If the button is a number
      currentInput += value;
      updateDisplay(currentInput);
    } else if (value === 'C') {
      // Clear everything
      clearCalculator();
    } else if (value === '=') {
      // Perform the calculation
      if (operator && previousInput) {
        const result = calculate(Number(previousInput), Number(currentInput), operator);
        updateDisplay(result);
        previousInput = result;
        currentInput = '';
        operator = null;
      }
    } else {
      // Handle operators (+, -, *, /)
      if (currentInput) {
        if (previousInput && operator) {
          // Perform intermediate calculation
          previousInput = calculate(Number(previousInput), Number(currentInput), operator);
        } else {
          previousInput = currentInput;
        }
        currentInput = '';
        operator = value;
      }
    }
  });
});

// Function to update the display
function updateDisplay(value) {
  display.textContent = value;
}

// Function to clear the calculator
function clearCalculator() {
  currentInput = '';
  operator = null;
  previousInput = '';
  updateDisplay('0');
}

// Function to perform calculations
function calculate(num1, num2, operator) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num2 !== 0 ? num1 / num2 : 'Error';
    default:
      return 'Error';
  }
}

