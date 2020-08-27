const ops = ["+", "-", "*", "/", "^"];
const otherButtons = [".", "C", "=", "<-"];

const calculator = {
    a : "", //an array of strings making up the first number
    b : "", //an array of strings making up the second number
    op : "", //the op to do
    onfirst : true, //whether you are on the first value
    nan : false //whether the number computed is NaN
};

const keypad = document.querySelector("#keypad");

for(i = 0; i < 10; i++){
    createButton("num", i);
}
for(i = 0; i < ops.length; i++) {
    createButton("op", ops[i]);
}
for(i = 0; i < otherButtons.length; i++){
    createButton("", otherButtons[i]);
}

/*precondition: a and b are some numbers
* postcondition: returns the mathematical compuation a op b, if 
* this is not a valid expression returns NaN
*/
function operation(a, b, op) {
    switch(op) {
        case("+") : return a + b;
        case("-") : return a - b;
        case("/") :
        if(b == 0) {
            return NaN;
        }
        return a / b;
        case("*") : return a * b;
        case("^") : return a ** b;
        default: return NaN;
    }
}

function createButton(type, val){
    const button = document.createElement("button");
    button.id = val.toString();
    button.style.gridArea = (val != '.') ? button.id : "dot";
    button.textContent = button.id;
    switch(type) {
        case "num" : button.classList.add("number");
        break;
        case "op" : button.classList.add("operator");
        break;
        default: button.classList.add("other");
        break;
    }
    keypad.appendChild(button);
}