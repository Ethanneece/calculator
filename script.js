let equation = "";

function displayEquation() {

    const output = document.getElementById("output");

    output.innerHTML = equation;
}

function calculate() {

    let nums = [];
    let operators = [];

    let num = "";
    for (let i = 0; i < equation.length; i++) {

        if (!isNaN(equation[i])) {
            num += equation[i];

        } else {
            console.log(num);
            operators.push(equation[i]);
            nums.push(num);
            num = "";
        }
    }

    if (num.length != 0) {
        nums.push(num);
    }

    console.log(nums);
    console.log(operators);

    for (let i = 0; i < equation.length; i++) {

        if (operators[i] == "*") {
            const num1 = Number(nums[i]);
            const num2 = Number(nums[i + 1]);
        
            const result = num1 * num2; 
        }

        if (operators[i] == "/") {
            const num1 = Number(nums[i]);
            const num2 = Number(nums[i + 1]);

            const result = num1 / num2; 
        }
    }
}

const numericButtons = document.getElementsByClassName("numeric");

for (let i = 0; i < numericButtons.length; i++) {

    numericButtons[i].addEventListener("click", () => {
        equation += numericButtons[i].value
        displayEquation(); 
    });
}

const operatorButtons = document.getElementsByClassName("operator");

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", () => {
        equation += operatorButtons[i].value
        displayEquation(); 
    });
}

const delButton = document.getElementById("delButton");

delButton.addEventListener("click", () => {
    equation = equation.slice(0, -1);

    displayEquation();
});

const equalButton = document.getElementById("equalButton");
equalButton.addEventListener("click", () => {
    calculate(); 

    displayEquation();
})

console.log('hi');