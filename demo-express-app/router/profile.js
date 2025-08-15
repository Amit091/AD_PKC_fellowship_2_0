const express = require("express");
const router = express.Router();
// create new get route?
router.get("/", (req, res) => {
  const location = req.query.location;
  const name = req.query.name;
  const country = req.query.country;
  res.send(
    `This is a profile route;<br/>From <br/>Location: ${location},<br/> name: ${name},<br/> country: ${country}`
  );
});

// create new route with route params and query param
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  const name = req.query.name;
  res.send(
    `This is example of dynamic route with query param; Hello Hero ${userId} ${name}`
  );
});
router.get("/detail/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`This is example of dynamic route; Hello User ${userId}`);
});

router.get(
  "/:id/education/:education/address/:address/:country",
  (req, res) => {
    const id = req.params.id;
    const education = req.params.education;
    const address = req.params.address;
    const country = req.params.country;
    const name = req.query.name;
    res.send(
      `This is example of nested dynamic route with query param; <br/>Profile Details <br/> name:${name} <br/> id: ${id} <br/> education: ${education} <br/> address: ${address} <br/> country: ${country}`
    );
  }
);

module.exports = router;