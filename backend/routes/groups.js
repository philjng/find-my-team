var express = require('express');
var router = express.Router();

const Group = require("../models/group");

/* GET groups listing. */
router.get('/', function(req, res, next) {
  Group.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res
        .status(500)
        .send({
          message: error.message || "There was an error while getting groups",
        });
    });
});

/* GET user created groups */
router.get('/created', function(req, res, next) {
  console.log("output: ", req.query.userId);
  Group.find({creatorId: req.query.userId})
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res
        .status(500)
        .send({
          message: error.message || "There was an error while getting groups",
        });
    });
});

/* GET user joined groups */
router.get('/joined', function(req, res, next) {
  Group.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res
        .status(500)
        .send({
          message: error.message || "There was an error while getting groups",
        });
    });
});

/* POST endpoint */
router.post("/", function(req, res, next){
  const newGroup = new Group(req.body)
  newGroup.save((error) => {
    if (error) {
      res
        .status(500)
        .send({ message: error.message || "POST group failed" });
    } else {
      res.send(newGroup);
    }
  });
});

module.exports = router;
