var express = require('express');
var router = express.Router();

const Group = require("../models/group");

/* GET groups listing. */
router.get('/', function(req, res, next) {
  Group.find().sort({createdAt:-1})
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
  Group.find({memberIds: req.query.userId, creatorId: {$ne: req.query.userId} })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error)
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

/* PUT endpoint to update group */
router.put("/:id", function (req, res, next) {
  // TODO: find new method - current one without the 'useFindAndModify' option set to false is deprecated
  Group.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, result) => {
      if (error) {
        res.status(error.code).send(error);
      } else {
        res.send(req.body);
      }
    }
  );
});

module.exports = router;
