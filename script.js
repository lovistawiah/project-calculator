let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".screen");

document.querySelector(".calc-buttons").addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
});

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handdleSymbol(value);
    } else {
        handleNumber(value);
    }
    reRender();
}

function handdleSymbol(value) {
    switch (value) {
        //use to clear the screen
        case 'C':
            buffer = '0'
            runningTotal = 0
            break;
            //unicode character for equal sign
        case '\u003D':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        // unicode character for left arrow
        case '\u2190':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                // remove the last number
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;
        default:
            handleMath(value);
            break;
    }

}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer)
    }
    previousOperator = value;
    buffer = '0'
}

function flushOperation(intBuffer) {
    //unicode for plus sign
    if (previousOperator === '\u002B') {
        runningTotal += intBuffer
        //unicode for minus sign
    } else if (previousOperator === '\u2212') {
        runningTotal -= intBuffer
        // unicode for division sign
    } else if (previousOperator === '\u00F7') {
        runningTotal /= intBuffer
    }
    else {
        runningTotal *= intBuffer;
    }
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }

}

function reRender() {
    screen.innerText = buffer;
}
