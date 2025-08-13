var express = require('express');
var router = express.Router();
var rootController = require('../controller/rootController');

router.get('/', rootController.home);

module.exports = router;
