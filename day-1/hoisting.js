console.log(a); // undefined (var is hoisted)
var a = 5;

sayHi(); // ✅ Works
function sayHi() {
  console.log("Hi!");
}

// greet(); ❌ Error
const greet = function () {
  console.log("Hello!");
};
