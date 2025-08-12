const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("Hello World");
  res.send("this is a response from the server from amit server from 192.168.1.122:3000");
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