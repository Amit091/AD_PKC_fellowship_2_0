const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("Hello World");
  // simple text response
  // res.send("this is a response from the server from amit server from <your_local_ip>:3000");
  res.send('<!doctype html><html><head><title>Home</title></head><body><h1>Hello from Express</h1></body></html>');
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