console.log("Start")

await new Promise((resolve,reject)=>{
  setTimeout(()=>{
    console.log("Hello Amit from setTimeout")
    reject(`reject by force.`)
  },0)
})

// setImmediate(()=>{
//   console.log("Hello Amit from setImmediate")
// })

// process.nextTick(()=>{
//   console.log("Hello Amit from process.nextTick")
// })

console.log("End")
