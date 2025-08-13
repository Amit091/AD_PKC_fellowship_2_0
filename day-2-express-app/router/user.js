const express = require("express");
const router = express.Router();
// create new get route?
router.get("/", (req, res) => {
  const location = req.query.location;
  const name = req.query.name;
  const country = req.query.country;
  res.send(
    `This is a user route;<br/>From <br/>Location: ${location},<br/> name: ${name},<br/> country: ${country}`
  );
})


router.get(`/try-catch`, (req, res) => {
  try {
    debugger;
    const data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
    const jsonData = JSON.parse(data);
    res.send(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error reading file");
  }
})

module.exports = router;