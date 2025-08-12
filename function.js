// regular function
function getName(){
  console.log("Hello Amit from Regular Function");
}
getName();

const getName2=()=>{
    console.log("Hello Amit from Arrow Function");
}
getName2();

// create a function to add two numbers 
function add(a,b){
  return a+b;
}
const sum = add(10,20);

console.log(`The sum of two numbers is ${sum}`);