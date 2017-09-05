"use strict";

function makeBuffer() {
    var buffer = "";

    var buffObj = function (str) {
        if (arguments.length === 0) return buffer;
        else {
            var v = new String(str);
            buffer += v.toString();
        }
    };

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

  
function eventHolder(elem) {
    elem.addEventListener("click",
        function () {
            console.log(elem.innerHTML);
        });
}