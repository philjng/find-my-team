var express = require("express");
const Event = require("../models/event");
var router = express.Router();
const User = require("../models/user");

/* GET all users */
router.get("/", function (req, res, next) {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "There was an error while getting users",
      });
    });
});

/* GET specific user */
router.get("/:id", function (req, res, next) {
  User.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "There was an error while getting users",
      });
    });
});

/* CREATE new user */
router.post("/", function (req, res, next) {
  const newUser = new User(req.body);
  newUser.save((error) => {
    if (error) {
      res
        .status(error.code)
        .send({ message: error.message || "POST user failed" });
    } else {
      res.send(newUser);
    }
  });
});

/* UPDATE user */
router.put("/:id", function (req, res, next) {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, result) => {
      if (error) {
        res.status(error.code).send(error);
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/:id/groups", function (req, res, next) {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, result) => {
      if (error) {
        res.status(error.code).send(error);
      } else {
        res.send(result);
      }
    }
  );
});

/* GET user created or joined events */
router.get("/:id/events", function (req, res, next) {
  const response = {};
  Event.find({
    creatorId: req.params.id,
  })
    .sort({ startTime: 1 })
    .then((createdEventsData) => {
      response.created = createdEventsData;
      Event.find({
        participantIds: { $in: req.params.id },
      })
        .sort({ startTime: 1 })
        .then((joinedEventsData) => {
          response.joined = joinedEventsData;
          res.send(response);
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message ||
              "There was an error while getting user's joined events",
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "There was an error while getting user's created events",
      });
    });
});

router.get("/search/:text", function (req, res, next) {
  const searchText = req.params.text;
  User.find(
    { $text: { $search: searchText } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "There was an error while getting event",
      });
    });
});

module.exports = router;
