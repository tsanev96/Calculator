const previousOperandTextElement = document.querySelector('#previous-operand');
const currentOperandTextElement = document.querySelector('#current-operand');

const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const divideOneButton = document.querySelector('[data-divide-one]');
const powerTwoButton = document.querySelector('[data-power-two]');
const squareRootButton = document.querySelector('[data-square-root]');
const changeSignButton = document.querySelector('[data-plus-minus]');
const equalButton = document.querySelector('[data-equal]');
const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation');

let currentOperand = '';
let previousOperand = '';
let operation;

allClearButton.addEventListener('click', allClear);
deleteButton.addEventListener('click', deleteLastElement);

divideOneButton.addEventListener('click', () => {
    if (currentOperand == '') return;
    currentOperand = 1 / currentOperand;
    updateDisplay();
});

powerTwoButton.addEventListener('click', () => {
    if (currentOperand == '') return
    currentOperand = Math.pow(currentOperand, 2);
    updateDisplay();
})

squareRootButton.addEventListener('click', () => {
    if (currentOperand < 0 || currentOperand == '') return
    currentOperand = Math.sqrt(currentOperand);
    updateDisplay();
});

numbers.forEach(number => {
    number.addEventListener('click', () => appendNumber(number.innerText));
    number.addEventListener('click', updateDisplay);
});

operations.forEach(operation => {
    operation.addEventListener('click', () => chooseOperation(operation.innerText));
    operation.addEventListener('click', updateDisplay);
});

changeSignButton.addEventListener('click', () => {
    currentOperand = currentOperand * (-1);
    updateDisplay();
});

equalButton.addEventListener('click', () => {
    debugger;
    if (previousOperand == '' || currentOperand == '') return;
    compute();
    operation = '';
    updateDisplay();
});

function allClear() {
    previousOperand = '';
    currentOperand = '';
    operation = '';
    updateDisplay();
}

function deleteLastElement() {
    debugger;
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function appendNumber(number) {
    if (number == '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand + number;
}

function chooseOperation(operationFunc) {
    if (currentOperand != '' && previousOperand != '') {
        compute();
    }
    operation = operationFunc;
    if (currentOperand === '') return;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function compute() {
    let result;
    let prev = parseFloat(previousOperand);
    let curr = parseFloat(currentOperand)
    switch (operation) {
        case '÷':
            result = prev / curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '+':
            result = prev + curr;
            break;
        default:
            return;
    }

    currentOperand = result;
    previousOperand = '';
    updateDisplay();
}

function updateDisplay() {
    if (operation == undefined) {
        previousOperandTextElement.innerText = getDisplayNumber(previousOperand);
    } else {
        previousOperandTextElement.innerText = getDisplayNumber(previousOperand) + operation;
    }
    currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
}

function getDisplayNumber(number) {
    let stringNumber = number.toString();
    let integerDigits = parseFloat(stringNumber.split('.')[0]);
    let decimalDigits = stringNumber.split('.')[1];

    if (isNaN(integerDigits)) {
        integerDigits = '';
    } else {
        integerDigits = integerDigits.toLocaleString('en');
    }

    if (isNaN(decimalDigits)) {
        return integerDigits;
    }
    return `${integerDigits}.${decimalDigits}`;
}