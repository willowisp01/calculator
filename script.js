// VARIABLES

let rawInput = ""; // half-typed numerals (e.g. I want 111, but only typed 11 so far)
let equalPressed = false;

const body = document.querySelector("body");
const display = document.querySelector("#display");


// EVENT LISTENERS

body.addEventListener("click", parse);


// FUNCTIONS 

// storing the previous numbers and ops
const numQueue = [];  //enq: queue.push(), deq: queue.shift();
const opQueue = []; 

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
    return a / b;
}

// updates the displayed content 
function updateDisplay(content) {
    display.textContent = content; 
}

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
            temp = divide(a, b); 
            result = Number.isFinite(temp) ? temp : "Error: Division by Zero"
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
        if (equalPressed && opQueue.length == 0) {
            allClear();
        }
        // no duplicate dots
        if (!(rawInput.length > 0 && rawInput.includes(".") && event.target.textContent === ".")) {
            rawInput += event.target.textContent; 
            updateDisplay(rawInput);
        }
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
    } else if (event.target.id == "evaluate") {
        equalPressed = true;
        // if possible to evaluate something
        if (opQueue.length > 0 && numQueue.length > 0 && rawInput != "") {
            numQueue.push(+rawInput);
            result = calculate();
            // we don't directly put result into numQueue, leave that to the upper logic.  
            // rather, update the rawInput to make sure subsequent operations work. 
            rawInput = "" + result; 
            updateDisplay(result);
        }
        return; // to ensure equalPressed is not reset to false
    } else if (event.target.id == "AC") {
        allClear();
    }

    // at the end of a button press, unless equal was pressed, equalPressed should be false. 
    equalPressed = false;
}

