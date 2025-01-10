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
        throw new Error('Cannot divide by zero!!!');
    }
    return a / b;
}

// unparsed (yet) numbers
let rawInput = ""; 

const inputPad = document.querySelector("#inputs");
inputPad.addEventListener("click", parse);

const display = document.querySelector("#display");

// updates the displayed content 
function updateDisplay(content) {
    display.textContent = content; 
}

// parses the inputs (and calls the needed functions)
function parse(event) {
    if (event.target.classList.contains("numeral")) {
        rawInput += event.target.textContent; 
        updateDisplay(rawInput);
    }
}

