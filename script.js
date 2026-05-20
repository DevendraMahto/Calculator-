const currentDisplay = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');

let currentInput = '0';
let previousInput = '';
let activeOperator = null;
let resetOnNextInput = false;

function updateDisplay() {
    currentDisplay.innerText = currentInput;
    if (activeOperator != null) {
        previousDisplay.innerText = `${previousInput} ${getOperatorSymbol(activeOperator)}`;
    } else {
        previousDisplay.innerText = '';
    }
}

function getOperatorSymbol(op) {
    if (op === '*') return '×';
    if (op === '/') return '÷';
    return op;
}

function appendNumber(number) {
    if (resetOnNextInput) {
        currentInput = '';
        resetOnNextInput = false;
    }
    if (number === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    activeOperator = operator;
    previousInput = currentInput;
    currentInput = '0';
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;

    switch (activeOperator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                result = "Error";
            } else {
                result = prev / current;
            }
            break;
        case '%':
            result = (prev / 100) * current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    activeOperator = null;
    previousInput = '';
    resetOnNextInput = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    activeOperator = null;
    resetOnNextInput = false;
    updateDisplay();
}

function deleteNumber() {
    if (resetOnNextInput) return;
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}