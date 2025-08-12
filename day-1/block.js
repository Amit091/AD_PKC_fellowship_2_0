let globalVar = "Global"; // Global scope

function test() {
  let localVar = "Function Scope"; // Function scope
  console.log(localVar);
  if (true) {
    let blockVar = "Block Scope"; // Block scope
    console.log(blockVar); // ✅ Accessible
  }
  // console.log(blockVar); ❌ Error
}
test();
console.log(globalVar); // ✅
