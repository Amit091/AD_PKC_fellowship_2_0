var express = require("express");
var router = express.Router();
var userController = require("../controller/userController");

router.get("/", userController.userDetails);
router.get("/list", userController.listUsers);

module.exports = router;
