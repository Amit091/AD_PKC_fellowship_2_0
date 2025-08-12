function greet(name) {
  return `Hello, ${name}!`;
}

function processUserInput(callback) {
  let name = "Amit";
  console.log(callback(name));
}

processUserInput(greet); // Hello, Amit!
