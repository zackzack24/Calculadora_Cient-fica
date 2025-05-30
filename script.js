const POWER = "POWER(";
const FACTORIAL = "FACTORIAL";
const OPERATORS = ["+", "-", "*", "/"];
 
let data = {
    operation: [],
    formula: []
};

let ans = 0;
Object.defineProperty(window, 'ans', {
    get: () => _ans,
    set: (val) => { _ans = val;}
})
let RADIAN = true;

const calculator_buttons = [
    { name: "rad", symbol: "Rad", formula: false, type: "key" },
    { name: "deg", symbol: "Deg", formula: false, type: "key" },
    { name: "square-root", symbol: "√", formula: "Math.sqrt", type: "math_function" },
    { name: "square", symbol: "x²", formula: POWER, type: "math_function" },
    { name: "open-parenthesis", symbol: "(", formula: "(", type: "number" },
    { name: "close-parenthesis", symbol: ")", formula: ")", type: "number" },
    { name: "clear", symbol: "C", formula: false, type: "key" },
    { name: "delete", symbol: "⌫", formula: false, type: "key" },
    { name: "pi", symbol: "π", formula: "Math.PI", type: "number" },
    { name: "cos", symbol: "cos", formula: "Math.cos", type: "trigo_function" },
    { name: "sin", symbol: "sin", formula: "Math.sin", type: "trigo_function" },
    { name: "tan", symbol: "tan", formula: "Math.tan", type: "trigo_function" },
    { name: "7", symbol: "7", formula: "7", type: "number" },
    { name: "8", symbol: "8", formula: "8", type: "number" },
    { name: "9", symbol: "9", formula: "9", type: "number" },
    { name: "division", symbol: "÷", formula: "/", type: "operator" },
    { name: "e", symbol: "e", formula: "Math.E", type: "number" },
    { name: "acos", symbol: "acos", formula: "Math.acos", type: "trigo_function" },
    { name: "asin", symbol: "asin", formula: "Math.asin", type: "trigo_function" },
    { name: "atan", symbol: "atan", formula: "Math.atan", type: "trigo_function" },
    { name: "4", symbol: "4", formula: "4", type: "number" },
    { name: "5", symbol: "5", formula: "5", type: "number" },
    { name: "6", symbol: "6", formula: "6", type: "number" },
    { name: "multiplication", symbol: "×", formula: "*", type: "operator" },
    { name: "factorial", symbol: "x!", formula: FACTORIAL, type: "math_function" },
    { name: "exp", symbol: "exp", formula: "Math.exp", type: "math_function" },
    { name: "ln", symbol: "ln", formula: "Math.log", type: "math_function" },
    { name: "log", symbol: "log", formula: "Math.log10", type: "math_function" },
    { name: "1", symbol: "1", formula: "1", type: "number" },
    { name: "2", symbol: "2", formula: "2", type: "number" },
    { name: "3", symbol: "3", formula: "3", type: "number" },
    { name: "subtraction", symbol: "-", formula: "-", type: "operator" },
    { name: "power", symbol: "x<span>y</span>", formula: POWER, type: "math_function" },
    { name: "ANS", symbol: "ANS", formula: "ans", type: "number" },
    { name: "percent", symbol: "%", formula: "/100", type: "number" },
    { name: "comma", symbol: ".", formula: ".", type: "number" },
    { name: "0", symbol: "0", formula: "0", type: "number" },
    { name: "calculate", symbol: "=", formula: "=", type: "calculate" },
    { name: "addition", symbol: "+", formula: "+", type: "operator" }
];

const input_element = document.querySelector('.input');
const output_operation_element = document.querySelector('.operation .value');
const output_result_element = document.querySelector('.result .value');
const rad_btn = document.getElementById('rad');
const deg_btn = document.getElementById('deg');
 
function createCalculatorButtons() {
    const buttons_per_row = 8;
    let added_buttons = 0;
    
    calculator_buttons.forEach(button => {
        if (added_buttons % buttons_per_row == 0) {
            input_element.innerHTML += `<div class="row"></div>`;
        }
        
        const row = document.querySelector(".row:last-child");
        if (button.name === "power") {
            row.innerHTML += `<button id="${button.name}" class="power-btn">${button.symbol}</button>`;
        } else {
            row.innerHTML += `<button id="${button.name}">${button.symbol}</button>`;
        }
        added_buttons++;
    });
}
 
createCalculatorButtons();
  
document.addEventListener('DOMContentLoaded', function() {
    
    const rad_btn = document.getElementById('rad');
    const deg_btn = document.getElementById('deg');
     
    if (rad_btn && deg_btn) {
         
        rad_btn.classList.add("active-angle");
        
         
        input_element.addEventListener('click', event => {
            const target_btn = event.target;
            calculator_buttons.forEach(button => {
                if (button.name == target_btn.id) calculator(button);
            });
        });
    } else {
        console.error("Angle mode buttons not found!");
    }
    
     
    let data = {
        operation: [],
        formula: []
    };
    let ans = 0;
    let RADIAN = true;
});

function angleToggler() {
    RADIAN = !RADIAN;
    rad_btn.classList.toggle("active-angle");
    deg_btn.classList.toggle("active-angle"); 
}

rad_btn.classList.add("active-angle");

input_element.addEventListener('click', event => {
    const target_btn = event.target;
    calculator_buttons.forEach(button => {
        if (button.name == target_btn.id) {
            calculator(button);
        }
    });
});

 
function calculator(button) {
    if (button.type == "operator") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    }
    else if (button.type == "number") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    }
    else if (button.type == "trigo_function") {
        data.operation.push(button.symbol + "(");
        data.formula.push(button.formula + "(");
    }
    else if (button.type == "math_function") {
        if (button.name == "factorial") {
            data.operation.push("!");
            data.formula.push(FACTORIAL);
        }
        else if (button.name == "power") {
            data.operation.push("^(");
            data.formula.push(POWER);
        }
        else if (button.name == "square") {
            data.operation.push("^(2)");
            data.formula.push(POWER + "2)");
        }
        else {
            data.operation.push(button.symbol + "(");
            data.formula.push(button.formula + "(");
        }
    }
    else if (button.type == "key") {
        if (button.name == "clear") {
            data.operation = [];
            data.formula = [];
            updateOutputResult(0);
        }
        else if (button.name == "delete") {
            data.operation.pop();
            data.formula.pop();
        }
        else if (button.name == "rad") {
            RADIAN = true;
            angleToggler();
        }
        else if (button.name == "deg") {
            RADIAN = false;
            angleToggler();
        }
    }
    else if (button.type == "calculate") {
        let formula_str = data.formula.join('');
        
       
        let POWER_SEARCH_RESULT = search(data.formula, POWER);
        let BASES = powerBaseGetter(data.formula, POWER_SEARCH_RESULT);
        
        BASES.forEach(base => {
            let toreplace = base + POWER;
            let replacement = "Math.pow(" + base + ",";
            formula_str = formula_str.replace(toreplace, replacement);
    });
        
         
        formula_str = formula_str.split(POWER).join(')');
        
         
        let FACTORIAL_SEARCH_RESULT = search(data.formula, FACTORIAL);
        let NUMBERS = factorialNumGetter(data.formula, FACTORIAL_SEARCH_RESULT);
        
        NUMBERS.forEach(number => {
            formula_str = formula_str.replace(number.toreplace, number.replacement);
        });
        
        
        let result;
        try {
             
            if (!RADIAN) {
                formula_str = formula_str.replace(/Math\.(sin|cos|tan|asin|acos|atan)\(/g, 
                    match => `trigo(Math.${match.slice(5)}`);
            }
        try {
            if (/[^0-9+\-*/().,=]/.test(formula_str)) {
                throw new Error("invalid characters")
            }
            result = eval(formula_str);
        } catch (error) {
            result = error instanceof SyntaxError ? "Syntax Error" : "Invalid Input"
        }
             
            formula_str = formula_str.replace(/ans/g, ans);
            
            result = eval(formula_str);
        } catch (error) {
            if (error instanceof SyntaxError) {
                result = "Syntax Error";
            } else {
                result = "Error";
            }
        }
        
        ans = result;
        data.operation = [result];
        data.formula = [result];
        updateOutputResult(result);
        return;
    }
    
    updateOutputOperation(data.operation.join(''));
}
 
function powerBaseGetter(formula, POWER_SEARCH_RESULT) {
    let powers_base = [];
    
    POWER_SEARCH_RESULT.forEach(power_index => {
        let base = [];
        let paren_count = 0;
        let prev_idx = power_index - 1;
        
        while (prev_idx >= 0) {
            if (formula[prev_idx] == "(") paren_count -= 1;
            if (formula[prev_idx] == ")") paren_count += 1;
            
            let is_operator = OPERATORS.includes(formula[prev_idx]);
            let is_power = formula[prev_idx] == POWER;
            
            if ((is_operator && paren_count == 0) || is_power) break;
            
            base.unshift(formula[prev_idx]);
            prev_idx--;
        }
        
        powers_base.push(base.join(''));
    });
    
    return powers_base;
}


function factorialNumGetter(formula, FACTORIAL_SEARCH_RESULT) {
    let numbers = [];
    let factorial_sequence = 0;
    
    FACTORIAL_SEARCH_RESULT.forEach(fact_index => {
        let number = [];
        let next_index = fact_index + 1;
        
        if (next_index < formula.length && formula[next_index] == FACTORIAL) {
            factorial_sequence += 1;
            return;
        }
        
        let first_fact_index = fact_index - factorial_sequence;
        let prev_idx = first_fact_index - 1;
        let paren_count = 0;
        
        while (prev_idx >= 0) {
            if (formula[prev_idx] == "(") paren_count -= 1;
            if (formula[prev_idx] == ")") paren_count += 1;
            
            let is_operator = OPERATORS.includes(formula[prev_idx]);
            if ((is_operator && paren_count == 0) || formula[prev_idx] == FACTORIAL) break;
            
            number.unshift(formula[prev_idx]);
            prev_idx--;
        }
        
        let number_str = number.join('');
        let times = factorial_sequence + 1;
        let toreplace = number_str + FACTORIAL.repeat(times);
        let replacement = 'factorial('.repeat(times) + number_str + ')'.repeat(times);
        
        numbers.push({
            toreplace: toreplace,
            replacement: replacement
        });
        
        factorial_sequence = 0;
    });
    
    return numbers;
} 
function search(array, keyword) {
    let search_res = [];
    array.forEach((element, index) => {
        if (element == keyword) {
            search_res.push(index);
        }
    });
    return search_res;
}
 
function updateOutputOperation(operation) {
    output_operation_element.innerHTML = operation;
}
 
function updateOutputResult(result) {
    output_result_element.innerHTML = result;
}

function trigo(callback, angle) {
    if (!RADIAN) {
        angle = angle * Math.PI / 180;
    }
    return callback(angle);
}

function factorial(number) {
    if (number < 0) return NaN;
    if (number % 1 != 0) {return gamma(number + 1);}
    if (number == 0 || number == 1) {return 1;}
    
    let result = 1;
    for (let i = 1; i <= number; i++) {result *= i;}
    return result === Infinity ? Infinity : result;
}
 
function gamma(n) {
    var g = 7;
    var p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 
             771.32342877765313, -176.61502916214059, 12.507343278686905, 
             -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    
    if (n < 0.5) {
        return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
        n--;
        var x = p[0];
        for (var i = 1; i < g + 2; i++) {
            x += p[i] / (n + i);
        }
        var t = n + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}
