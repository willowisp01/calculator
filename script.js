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
    // if (b === 0) {
    //     throw new Error('Cannot divide by zero!!!');
    // }
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

// makes a calculation using que

// storing the previous numbers and ops
const numQueue = [];  //enq: queue.push(), deq: queue.shift();
const opQueue = []; 

// parses the inputs (and calls the needed functions)
function parse(event) {
    // parse number
    if (event.target.classList.contains("numeral")) {
        rawInput += event.target.textContent; 
        updateDisplay(rawInput);
    } else if (event.target.classList.contains("operation") && (rawInput != "")) {
        // always parse number typed before the operation, and push op and number to respective queues
        numQueue.push(+rawInput);
        rawInput = ""; 
        opQueue.push(event.target.textContent);
        if (numQueue.length >= 2) { // have 2 numbers to perform a calculation 
            let a = numQueue.shift();
            let b = numQueue.shift();
            let op = opQueue.shift();
            let result; 
            // console.log(a);
            // console.log(b);
            // console.log(op);
            switch (op) {
                case '+':
                    result = add(a, b);
                    break;
                case '-':
                    result = subtract(a, b); 
                    break;
                case '*':
                    result = multiply(a, b);
                    break;
                case '/':
                    result = divide(a, b); //TODO: handle divide by 0\
                    break;
            }
            numQueue.push(result);
            updateDisplay(result);
        } 
    }
}

