//Arrays for button creations and grid placement
const ops = [{id: "+", area: "p"}, {id: "-", area: "s"}, 
    {id: "*", area: "m"}, {id: "/", area: "d"}, {id: "^", area: "ex"}];
const otherButtons = [{id: ".", area: "dot"}, {id: "C", area: "C"}, 
    {id: "=", area: "e"}, {id: "<=", area: "ar"}];
const numbers = [{id: "0", area: "z"}, {id: "1", area: "o"}, {id: "2", area: "tw"},
    {id: "3", area: "th"}, {id: "4", area: "f"}, {id: "5", area: "fv"}, {id: "6", area: "sx"},
    {id: "7", area: "sev"}, {id: "8", area: "egt"}, {id: "9", area: "n"}];

const calculator = {
    a : "", //an array of strings making up the first number
    b : "", //an array of strings making up the second number
    op : "", //the op to do
    onfirst : true, //whether you are on the first value
    nan : false, //whether the number computed is NaN
    addable : true,
    updateDisplay : function (){
        display.textContent = calculator.onfirst ? calculator.a : calculator.b;
    },
    addNumber : function(number) {
        if(this.nan || !this.addable) {
            return;
        }   
        if(this.onfirst) {
            this.a += number;
        } else{
            this.b += number;
        }
        this.updateDisplay();
    },
    clear: function(){
        this.a = "";
        this.b = "";
        this.op = "";
        this.onfirst = true;
        this.nan = false;
        this.addable = true;
        display.textContent = "0";
    },
    compute: function() {
        if(this.a == "" || this.b == "" || this.op == "" || this.nan){
            return;
        } else{
            this.a = operation(this.a, this.b, this.op);
            this.onfirst = true;
            this.b = "";
            this.op = "";
            this.nan = (this.a == "NaN");
            display.textContent = this.a;
        }
        this.addable = false;
    }
};

const keypad = document.querySelector("#keypad");
const display = document.querySelector("#display");


for(i = 0; i < 10; i++){
    createButton("num", numbers[i]);
}
for(i = 0; i < ops.length; i++) {
    createButton("op", ops[i]);
}
for(i = 0; i < otherButtons.length; i++){
    createButton("", otherButtons[i]);
}

const numberKeys = document.querySelectorAll(".number");
numberKeys.forEach(number => number.addEventListener('click', () =>{
    calculator.addNumber(number.id);
}));

const clearKey = document.querySelector("#C");
clearKey.addEventListener('click', () => {
    calculator.clear();
});

const equalsKey = document.querySelector("#\\=");

equalsKey.addEventListener('click', () => {
    calculator.compute();
});

const decimalKey = document.querySelector("#\\.");
decimalKey.addEventListener('click', () => {
    if(calculator.nan || !calculator.addable){
        return;
    }
    if(calculator.onfirst) {
        if(!calculator.a.includes(".")) {
            calculator.a += ".";
        }
    } else {
        if(!calculator.b.includes(".")) {
            calculator.b += ".";
        }   
    }
    calculator.updateDisplay();
})

const backKey = document.querySelector("#\\<\\=");
backKey.addEventListener('click', () => {
    if(calculator.nan || !calculator.addable) {
        return;
    }
    if(calculator.onfirst) {
        if(calculator.a.length >= 2) {
            calculator.a = calculator.a.substring(0, calculator.a.length - 1);
        } else {
            calculator.a = "";
        }
    } else{
        if(calculator.b.length >= 2) {
            calculator.b = calculator.b.substring(0, calculator.b.length - 1);
        } else {
            calculator.b = "";
        }
    }
    calculator.updateDisplay();
});

const opKeys = document.querySelectorAll(".operator");
opKeys.forEach(key => key.addEventListener('click', () => {
    if(calculator.nan) {
        return;
    }
    const op = key.id;
    if(calculator.onfirst) {
        calculator.onfirst = false;
        calculator.op = op;
    } else {
        if(calculator.b == ""){
            calculator.op = op;
            return;
        } else{
            calculator.compute();
            calculator.onfirst = false;
            calculator.op = op;
        }
    }
    calculator.addable = true;
}));



/*precondition: a and b are some numbers
* postcondition: returns the mathematical compuation a op b, if 
* this is not a valid expression returns NaN
*/
function operation(a, b, op) {
    switch(op) {
        case("+") : return (Number(a) + Number(b)).toString();
        case("-") : return (Number(a) - Number(b)).toString();
        case("/") :
        if(b == "0") {
            return "NaN";
        }
        return (Number(a) / Number(b)).toString();
        case("*") : return (Number(a) * Number(b)).toString()
        case("^") : return (Number(a) ** Number(b)).toString();
        default: return "NaN";
    }
}

// Helper function to create and insert keypad buttons
function createButton(type, val){
    const button = document.createElement("button");
    button.id = val.id;
    button.style.gridArea = val.area;
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