var express = require("express");
var router = express.Router();
const Event = require("../models/event");
var mongoose = require("mongoose");
const User = require("../models/user");
const _ = require("lodash");

/* GET all events listing, ordered by the start time of event. */
router.get("/", function (req, res, next) {
  Event.find()
    .sort({ startTime: 1 })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "There was an error while getting events",
      });
    });
});

/* GET a single event */
router.get("/:id", function (req, res, next) {
  Event.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "There was an error while getting event",
      });
    });
});

/* Search for keyword in events collection */
router.get("/search/:text?", function (req, res, next) {
  if (req.params.text === '') {
    return [];
  }
  const searchText = req.params.text;
  Event.find(
    { $text: { $search: searchText } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .then((data) => {
      Event.find(
        {$or: [
          { title: { $regex: searchText, $options: "i" } },
          { location: { $regex: searchText, $options: "i" } },
          { description: { $regex: searchText, $options: "i" } },
          { tags: { $regex: searchText, $options: "i" } },
          { comments: { $regex: searchText, $options: "i" } }

        ]})
      .then(
        (data2) => {
          let allResults = data.concat(data2);
          let uniqueIds = [];
          let uniqueResults = [];
          for (let i = 0; i < allResults.length; i++) {
            if (!uniqueIds.includes(allResults[i]._id.toString())) {
              uniqueIds.push(allResults[i]._id.toString());
              uniqueResults.push(allResults[i]);
            }
          }
          res.send(uniqueResults);
        }
      );
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "There was an error while getting event",
      });
    });
});

/* Create a new event */
router.post("/", function (req, res, next) {
  const newEvent = new Event(req.body);
  newEvent.save((error) => {
    if (error) {
      res.status(500).send({ message: error.message || "POST event failed" });
    } else {
      console.log("POST event successful");
      res.send(req.body);
    }
  });
});

/*Add a comment to an event posting */
router.patch("/:id/comments", function (req, res, next) {
  Event.findByIdAndUpdate(req.params.id, {
    $push: { comments: req.body.comment },
  })
    .then(() => res.send("success"))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

/* GET event participants */
router.get("/:id/participants", function (req, res, next) {
  Event.findById(req.params.id)
    .then((eventData) => {
      return User.find({
        _id: {
          $in: eventData.participantIds,
        },
      });
    })
    .then((usersData) => {
      res.send(usersData);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "There was an error while getting group members",
      });
    });
});

/* Add participant */
router.patch("/:id/participants", function (req, res, next) {
  Event.findByIdAndUpdate(req.params.id, {
    $push: { participantIds: req.body.userId },
    $inc: { participantSize: 1 },
  })
    .then(() => res.send("success"))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

/* Remove participant */
router.patch("/:id/removeParticipant", function (req, res, next) {
  Event.findByIdAndUpdate(req.params.id, {
    $pull: { participantIds: req.body.userId },
    $inc: { participantSize: -1 },
  })
    .then(() => res.send("success"))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

/* Delete event */
router.delete("/:id", function (req, res, next) {
  Event.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
