const numberKeys = [...document.querySelectorAll('.num')];
const operationKeys = [...document.querySelectorAll('.op')];
const displayText = document.querySelector('.display-text');
const resKey = document.querySelector('#k-res');
const clearKey = document.querySelector('#k-clear');
const calculator = document.querySelector('.calculator');
const calculatorTab = document.querySelector('#calculator-tab');
const imgTab = document.querySelector('#tab-img');

const clearDisplay = () => {
    if (displayText.innerHTML === '0' || displayText.innerHTML === 'Infinity') {
        displayText.innerHTML = '';
    }
}

const checkOperation = (evt) => {
    if (evt.target.innerHTML === 'x') {
        displayText.innerHTML += '*';
        
        signal = true;
        floatPoint = false;
    } else if (evt.target.innerHTML === ',' && !floatPoint) {
        displayText.innerHTML += '.';

        floatPoint = true;
    } else if (evt.target.innerHTML !== ',') {
        displayText.innerHTML += evt.target.innerHTML;
        
        signal = true;
        floatPoint = false;
    }
}

let signal = false;
let floatPoint = false;

numberKeys.forEach(key => {
    key.addEventListener('click', (evt) => {
        clearDisplay();

        if (evt.target.innerHTML !== '0'){
            clearKey.innerHTML = 'C';
        }

        displayText.innerHTML += evt.target.innerHTML;

        signal = false;
    });
});

operationKeys.forEach(key => {
    key.addEventListener('click', (evt) => {
        if (!signal && displayText.innerHTML !== 'Infinity') {
            clearKey.innerHTML = 'C';

            checkOperation(evt);
        }
    });
});

resKey.addEventListener('click', () => {
    res = eval(displayText.innerHTML);

    res = res.toString();
    
    if (res.length >= 11) {
        res = res.slice(0, 11);
    }
    
    displayText.innerHTML = res;
    
    signal = false;
    floatPoint = false;
});

clearKey.addEventListener('click', () => {
    clearKey.innerHTML = 'AC';

    displayText.innerHTML = '0';

    signal = false;
    floatPoint = false;
});

calculatorTab.addEventListener('click', (evt) => {
    calculator.classList.toggle('calculator-show');

    if (calculator.classList.contains('calculator-show')) {
        imgTab.setAttribute('src', 'assets/arrow-left.png');
    } else {
        imgTab.setAttribute('src', 'assets/arrow-right.png');
    }
});