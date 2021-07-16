var express = require('express');
var router = express.Router();

const Group = require("../models/group");

/* GET groups listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST endpoint */
router.post("/", function(req, res, next){
  const newGroup = new Group(req.body)
  newGroup.save((error) => {
    if (error) {
      res
        .status(error.code)
        .send({ message: error.message || "POST group failed" });
    } else {
      res.send(newGroup);
    }
  });
});

module.exports = router;
