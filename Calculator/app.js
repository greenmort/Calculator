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
            
        });
}

document.querySelector("#AC").onclick = function() {
    buffer.clear();
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
