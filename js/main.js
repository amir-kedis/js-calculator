function calculator() {
    const previousOperandTextElement = document.querySelector(".previous_operand");
    const currentOperandTextElement = document.querySelector(".current_operand");
    const numbers = document.querySelectorAll("[data-number]");
    const operators = document.querySelectorAll("[data-operator]");
    const allClearBtn = document.querySelector("[data-all-clear]");
    const deleteBtn = document.querySelector("[data-delete]");
    const equalBtn = document.querySelector("[data-equal]");

    let previousOperand = '';
    let currentOperand = '';
    let operation = undefined;

    clear();

    function clear() {
        previousOperand = '';
        currentOperand = '';
        operation = undefined;
    }

    function display() {
        if (operation) {
            previousOperandTextElement.textContent = `${previousOperand} ${operation}`;
        } else {
            previousOperandTextElement.textContent = `${previousOperand}`;
        }
        currentOperandTextElement.textContent = currentOperand;
    }

    function appendNumber(number) {
        if (number === "." && currentOperand.toString().includes(".")) return;
        currentOperand += number.toString();
    }

    function deleteLast() {
        currentOperand = currentOperand.toString().slice(0, currentOperand.toString().length - 1);
    }

    function chooseOperator(operator) {
        if (currentOperand === "") return;
        if (previousOperand !== "") operate();
        operation = operator.textContent;
        previousOperand = currentOperand;
        currentOperand = "";
    }

    function operate() {
        let result = 0;

        if (isNaN(previousOperand) || isNaN(currentOperand)) return;
        switch (operation) {
            case "+":
                result = parseFloat(previousOperand) + parseFloat(currentOperand);
                break;
            case "-":
                result = parseFloat(previousOperand) - parseFloat(currentOperand);
                break;
            case "*":
                result = parseFloat(previousOperand) * parseFloat(currentOperand);
                break;
            case "/":
                if (parseFloat(currentOperand) == 0) {
                    alert("can't divide by zero")
                    clear();
                    display();
                    return;
                }
                result = parseFloat(previousOperand) / parseFloat(currentOperand)
                break;
            default:
                return;
                break;
        }

        currentOperand = result;
        operation = undefined;
        previousOperand = "";
    }

    numbers.forEach(number => {
        number.addEventListener("click", () => {
            appendNumber(number.textContent);
            display();
        })
    });

    allClearBtn.addEventListener("click", () => {
        clear();
        display();
    })

    deleteBtn.addEventListener("click", () => {
        deleteLast();
        display();
    })

    operators.forEach(operator => {
        operator.addEventListener("click", () => {
            chooseOperator(operator);
            display();
        })
    });

    equalBtn.addEventListener("click", () => {
        operate();
        display();
    })


}

calculator();
