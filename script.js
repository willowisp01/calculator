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
let equalPressed = false;

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

// Higher order function to calculate result based on queued numbers and ops. 
// This only dequeues from the queues. You have to enq the result later. 
function calculate() {
    let a = numQueue.shift();
    let b = numQueue.shift();
    let op = opQueue.shift();
    let result; 
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
            result = divide(a, b); //TODO: handle divide by 0
            break;
    }
    return result;
}

function allClear() {
    rawInput = "";
    numQueue.length = 0;
    opQueue.length = 0;
    updateDisplay("");
}

// FYI: event.target is a DOM element. (with attributes and methods: https://www.w3schools.com/jsreF/dom_obj_all.asp)
// parses the inputs (and calls the needed functions)
function parse(event) {
    let result;
    if (event.target.classList.contains("numeral")) {
        // after a previous equal is pressed, when entering a new numeral, reset. 
        if (equalPressed) {
            allClear();
        }
        rawInput += event.target.textContent; 
        updateDisplay(rawInput);
    } else if (event.target.classList.contains("operation") && (rawInput != "")) {
        // always parse number typed before the operation, and push op and number to respective queues
        numQueue.push(+rawInput);
        rawInput = ""; 
        opQueue.push(event.target.textContent);
        if (numQueue.length >= 2) { // have 2 numbers to perform a calculation 
            result = calculate();
            numQueue.push(result);
            updateDisplay(result);
        } 
    } else if (event.target.id == "evaluate" && opQueue.length > 0 && numQueue.length > 0) {
        equalPressed = true;
        numQueue.push(+rawInput);
        result = calculate();
        // we don't directly put result into numQueue, leave that to the upper logic.  
        // rather, update the rawInput to make sure subsequent operations work. 
        rawInput = "" + result; 
        updateDisplay(result);
        return;
    } else if (event.target.id == "AC") {
        allClear();
    }

    // at the end of a button press, unless equal was pressed, equalPressed should be false. 
    equalPressed = false;

    // console.log("State after pressing button:")
    // console.log("Numqueue", numQueue);
    // console.log("Opqueue", opQueue);
    // console.log("Raw input: " + rawInput);
}

