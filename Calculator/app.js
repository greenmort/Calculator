"use strict";

function makeBuffer() {
    var buffer = "";
    var numStack = [];
    var operStack = [];

    var buffObj = function (str) {
        if (arguments.length === 0) return buffer;
        else {
            var v = new String(str);
            buffer += v.toString();
        }
    };

    buffObj.hasPoint = false;
    buffObj.value = function() {
        return +buffer;
    }

    buffObj.clear = function () {
        buffer = "";
    };

    buffObj.pushNumber = function(num) {
        numStack.push(num);
        console.log(numStack);
    }

    buffObj.popNumber = function () {
        return numStack.pop();
    }

    buffObj.getLastNumber = function ()
    {
        return numStack[numStack.length - 1];
    }

    buffObj.pushOperation = function (oper) {
        operStack.push(oper);
        console.log(operStack);
    }

    buffObj.popOperation = function () {
        return operStack.pop();
    }

    buffObj.clearNumStack = function (){
        numStack = [];
    }

    buffObj.clearOperStack = function () {
        operStack = [];
    }

    buffObj.StackLength = function() {
        var stackLength = new Object;
        stackLength.numStack = numStack.length;
        stackLength.operStack = operStack.length;
        return stackLength;
    }

    buffObj.calculate = function() {
        if (numStack.length === operStack.length) var lastOper = operStack.pop();
        var members = [];
        var operations = [];
        while (numStack.length) {
            var tempNum = numStack.pop();
            if (operStack.length) var tempOper = operStack.pop();
            else tempOper = null;
            if (tempOper === "*" || tempOper === "/") {
                switch (tempOper) {
                    case "*":
                        members.push(tempNum * numStack.pop());
                        break;
                    case "/":
                        members.push(numStack.pop() / tempNum);
                        break;
                }
                if (operStack.length) operations.push(operStack.pop());
            } else {
                members.push(tempNum);
                if (tempOper) operations.push(tempOper);
            }
            console.log(numStack);
            console.log(operStack);
            console.log(members);
            console.log(operations);
        }
        var total = members.pop();
        if (members.length && operations.length) {
            while (members.length) {
                var tempMember = members.pop();
                var tempOperation = operations.pop();
                switch (tempOperation) {
                case "+":
                    total += tempMember;
                    break;
                case "-":
                    total -= tempMember;
                    break;
                }
            }
        }
        
        if (lastOper) operStack = [lastOper];
        numStack = [total];
        return total;
    }

    return buffObj;
};

var buffer = makeBuffer();

var numbers = document.querySelectorAll(".number");
for (var i = 0; i < numbers.length; i++) {
    eventHolder(numbers[i]);
};

var operations = document.querySelectorAll(".operation");
for (var i = 0; i < operations.length; i++) {
    operatorHolder(operations[i]);
};
  
function eventHolder(elem) {
    elem.addEventListener("click",
        function () {
            if (elem.innerHTML === "0" && buffer.value() === 0) return;
            else if (buffer.value() === 0) document.querySelector("#tableu").innerHTML = "";
            
            buffer(elem.innerHTML);
            document.querySelector("#tableu").innerHTML = buffer();
        });
}

function operatorHolder(elem) {
    elem.addEventListener("click",
        function () {
            buffer.pushNumber(buffer.value());
            buffer.pushOperation(elem.innerHTML);
            buffer.clear();
            buffer.hasPoint = false;          
        });
}

document.querySelector("#AC").onclick = function() {
    buffer.clear();
    buffer.clearNumStack();
    buffer.clearOperStack();
    buffer.hasPoint = false;
    document.querySelector("#tableu").innerHTML = "0";
}

document.querySelector("#point").onclick = function () {
    if (buffer.hasPoint) return;
    else {
        if (buffer.value() === 0) buffer ("0");
        buffer(".");
        buffer.hasPoint = true;
        document.querySelector("#tableu").innerHTML = buffer();
    }
}

document.querySelector("#equal").onclick = function () {

    if (buffer.value()) buffer.pushNumber(buffer.value());
    else if (buffer.StackLength().numStack) buffer.pushNumber(buffer.getLastNumber());

    if (buffer.StackLength().numStack > 1 && buffer.StackLength().operStack > 0) {
        buffer.clear();
        buffer.hasPoint = false;
        document.querySelector("#tableu").innerHTML = buffer.calculate();
    } 
}