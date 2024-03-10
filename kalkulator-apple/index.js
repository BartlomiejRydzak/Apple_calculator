var btn = document.querySelectorAll("button");
var spanResult =  document.querySelector(".result")
var n = btn.length;

var result = "";
var number1 = 0;
var number2 = 0;
var valResult = 0;
var previous_operator = null;
var active_negative = 0;

for(var i=0; i<n; i++){
    btn[i].addEventListener("click", function (){
        convertInput(this.id);
    })
}

function convertInput(input){
    switch(input){
        case "ac":
            spanResult.innerHTML = "0";
            result = "";
            number1 = 0;
            number2 = 0;
            valResult = 0;
            previous_operator = null;
            active_negative = 0;
            break;

        case "plus":
            action("plus");
            break;
        
        case "minus":
            action("minus");
            break;

        case "multiply":
            action("multiply");
            break;

        case "divide":
            action("divide");
            break;

        case "equal":
            equal();
            break;
        case "comma":
            if(result === ""){
                result = "0.";
            }
            else{
                result += ".";
            }
            spanResult.innerHTML = result;
            break;

        case "negative":
            if(result !== ""){
                if(active_negative){
                    result = result.slice(1);
                    active_negative = 0;

                }
                else{
                    result = "-" + result;
                    active_negative = 1;
                }
                spanResult.innerHTML = result;
                if(previous_operator === null){
                    number1 = -number1;
                }
            }
            break;

        case "percent":
            var temp = parseFloat(spanResult.innerHTML);
            temp /= 100;
            result = "" + temp;
            spanResult.innerHTML = result;
            if(previous_operator === null){
                number1 /= 100;
            }
            break;

        default:
            result += input;
            spanResult.innerHTML = result;
            if(previous_operator === null){
                number1 = parseFloat(result);
            }
            break;
    }
}

function calculate(calculation) {
    number2 = parseFloat(result);
    console.log(result);

    valResult = calculation(number1, number2);
    result = "";

    number1 = valResult;
}

function plus(number1, number2){
    return round(number1 + number2);
}

function minus(number1, number2){
    return round(number1 - number2);
}

function multiply(number1, number2){
    return round(number1 * number2);
}

function divide(number1, number2){
    return round(number1 / number2);
}

function equal(){
    active_negative = 0;
    if(previous_operator !== null){
        if(previous_operator === "plus"){
            calculate(plus);
        }
        if(previous_operator === "minus"){
            calculate(minus);
        }

        if(previous_operator === "multiply"){
            calculate(multiply);
        }

        if(previous_operator === "divide"){
            calculate(divide);
        }

        spanResult.innerHTML = valResult;
    }
}

function action(operator){
    active_negative = 0;
    if(previous_operator === null){
        previous_operator = operator;
        result = "";
        spanResult.innerHTML = "0";
    }
    else if(previous_operator !== operator){
        previous_operator = operator;
    }
}

function round(number){
    return +(Math.round(number + "e" + 7) + "e-" + 7);
}