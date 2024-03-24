let equation = "";

const themes = ["Body", "Heading", "Main", "Inputs", "CalcButton", "CalcButton:active",
                    "EqualButton", "delContainer", "RemoveButton", "RemoveButton:active",
                    "OutputContainer", "Output", "ThemeSelectionBackground", "Header",
                    "Header"]

function displayEquation() {

    const output = document.getElementById("output");


    output.innerHTML = equation;

    if (equation.length == 0) {
        output.innerHTML = "0";
    }

}

function removeError() {

    if (equation.startsWith("undefined")) {
        equation = equation.slice("undefined".length, 0);
    }

    if (equation.startsWith("NaN")) {
        equation = equation.slice("NaN".length, 0);
    }
}

function changeTheme() {

    const options = document.getElementsByClassName("options");
    const themeSelected = document.getElementById("themeSelected");

    for (let i = 0; i < options.length; i++) {

        if (options[i].contains(themeSelected)) {

            const nextOption = (i + 1) % 3;
            
            options[nextOption].appendChild(themeSelected.cloneNode(true));

            options[i].removeChild(themeSelected);
            switchTheme(i + 1, nextOption + 1);
            return;
        }
    }
}

function switchTheme(current, next) {


    for (let i = 0; i < themes.length; i++) {
        const currentTheme = "t" + current + themes[i];
        const nextTheme = "t" + next + themes[i];
        const elements = document.getElementsByClassName(currentTheme);
        console.log(currentTheme);
        console.log(elements);

        while (elements.length > 0) {
            console.log(currentTheme)
            console.log(elements[0]);
            elements[0].classList.add(nextTheme);
            elements[0].classList.remove(currentTheme);
        }
    }
}

function calculate() {

    if (equation.length == 0) {
        return;
    }

    let nums = [];
    let operators = [];


    let num = "";
    for (let i = 0; i < equation.length; i++) {

        if (!isNaN(equation[i]) || equation[i] == ".") {
            num += equation[i];

        } else {
            operators.push(equation[i]);
            nums.push(num);
            num = "";
        }
    }

    if (num.length != 0) {
        nums.push(num);
    }

    console.log()

    if (operators.length != nums.length - 1) {
        equation = "undefined"
        return;
    }

    for (let i = 0; i < operators.length; i++) {

        if (operators[i] == "x") {
            const num1 = Number(nums[i]);
            const num2 = Number(nums[i + 1]);
        
            const result = num1 * num2; 
            nums[i] = result; 
 
            nums.splice(i + 1, 1);
            operators.splice(i, 1); 
            i--;
        }

        if (operators[i] == "/") {
            const num1 = Number(nums[i]);
            const num2 = Number(nums[i + 1]);

            const result = num1 / num2; 
            nums[i] = result;

            nums.splice(i + 1, 1);
            operators.splice(i, 1);
            i--;
        }
    }

    for (let i = 0; i < operators.length; i++) {

        if (operators[i] == "+") {
            const num1 = Number(nums[i]);
            const num2 = Number(nums[i + 1]);

            const result = num1 + num2; 
            nums[i] = result;

            nums.splice(i + 1, 1);
            operators.splice(i, 1);
            i--;
        }

        if (operators[i] == "-") {
            const num1 = Number(nums[i]);
            const num2 = Number(nums[i + 1]);

            const result = num1 - num2; 
            nums[i] = result;

            nums.splice(i + 1, 1);
            operators.splice(i, 1);
            i--;
        }
    }

    equation = "" + nums[0];
}

const numericButtons = document.getElementsByClassName("numeric");

for (let i = 0; i < numericButtons.length; i++) {

    numericButtons[i].addEventListener("click", () => {
        removeError();
        equation += numericButtons[i].value
        displayEquation(); 
    });
}

const operatorButtons = document.getElementsByClassName("operator");

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", () => {
        removeError();
        equation += operatorButtons[i].value
        displayEquation(); 
    });
}

const delButton = document.getElementById("delButton");

delButton.addEventListener("click", () => {

    removeError();
    equation = equation.slice(0, -1);

    displayEquation();
});

const equalButton = document.getElementById("equalButton");
equalButton.addEventListener("click", () => {
    calculate(); 

    displayEquation();
});

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
    equation = ""; 

    displayEquation();
});

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {
    changeTheme();
}); 