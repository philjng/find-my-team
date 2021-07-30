var express = require("express");
var router = express.Router();
const Event = require("../models/event");
var mongoose = require("mongoose");

/* GET events listing. */
router.get("/", function (req, res, next) {
  Event.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "There was an error while getting events",
      });
    });
});

router.get("/search/:text", function (req, res, next) {
  Event.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "There was an error while getting events",
      });
    });
});

router.post("/", function (req, res, next) {
  let startDate = new Date(req.body.start + " UTC");
  let endDate = new Date(req.body.end + " UTC");
  const newEvent = new Event({
    creator: req.body.user.id,
    title: req.body.title,
    description: req.body.description,
    genreTags: req.body.tags,
    startTime: new Date(startDate.toISOString()),
    endTime: new Date(endDate.toISOString()),
    location: req.body.location,
    participantSize: "1",
    participants: [req.body.user],
    group: mongoose.Types.ObjectId("51c35e5ced18cb901d000001"),
    status: "status",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  newEvent.save((error) => {
    if (error) {
      console.log("Ooops, something happened to event POST");
      console.log(error);
      res.send(error);
    } else {
      console.log("POST event successful");
      res.send(req.body);
    }
  });
});

router.patch("/comment", function (req, res, next) {
  Event.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { comments: req.body.comment } }
  )
    .then(() => res.send("success"))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

router.patch("/participant", function (req, res, next) {
  Event.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { participants: req.body.participant } }
  )
    .then(() => res.send("success"))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
