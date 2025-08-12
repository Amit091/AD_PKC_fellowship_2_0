console.log("Start")

await new Promise((resolve,reject)=>{
  setTimeout(()=>{
    console.log("Hello Amit from setTimeout")
    if(Math.random() > 0.5){
      resolve("resolve by force.")
    }else{
      reject(`reject by force.`)
    }
  },0)
})

setImmediate(()=>{
  console.log("Hello Amit from setImmediate")
})

process.nextTick(()=>{
  console.log("Hello Amit from process.nextTick")
})

console.log("End")
/**
 * Output:
 * Start
Hello Amit from setTimeout
End
Hello Amit from process.nextTick
Hello Amit from setImmediate
 */