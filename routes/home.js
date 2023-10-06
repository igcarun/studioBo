var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.cookies);
  res.send('Welcome to Home router');
});

module.exports = router;
