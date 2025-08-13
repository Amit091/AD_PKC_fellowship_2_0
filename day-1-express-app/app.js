const express = require("express");

const app = express();

app.get("/amit", (req, res) => {
  console.log("Hello World");
  // simple text response
  res.send("this is from <your_local_ip>:3000");
  // res.send(
  //   '<!doctype html><html><head><title>Home</title></head><body><h1 style="color: red;">Hello from Express</h1></body></html>'
  // );
  // res.render(`
  // <!DOCTYPE html>
  // <html>
  //   <head>
  //     <title>My First Web Page</title>
  //   </head>
  // `);
});

app.listen(3000, () => {
  console.log("Express app is running on port 3000");
});