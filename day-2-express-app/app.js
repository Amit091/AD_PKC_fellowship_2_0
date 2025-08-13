const express = require("express");

const profileRouter = require("./router/profile");
const userRouter= require("./router/user");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/profile", profileRouter);
// create new route for user and use new file
app.use(`/user`, userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
