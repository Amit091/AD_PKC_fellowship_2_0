const express = require("express");
const profileRouter = require("./router/profile");
const userRouter = require("./router/user");
const collegeRouter = require("./router/college");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/profile", profileRouter);
app.use(`/user`, userRouter);
app.use("/colleges", collegeRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
