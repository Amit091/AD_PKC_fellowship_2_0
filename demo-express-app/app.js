const express = require("express");
const cors = require("cors");
const profileRouter = require("./router/profile");
const userRouter = require("./router/user");
const collegeRouter = require("./router/college");

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON body
app.use(express.json());

// Middleware to parse form data (if needed)
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/profile", profileRouter);
app.use(`/user`, userRouter);
app.use("/colleges", collegeRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}); 