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

router.post("/", function (req, res, next) {
  let startDate = new Date(req.body.start);
  let endDate = new Date(req.body.end);
  const newEvent = new Event({
    creator: req.body.user.id,
    title: req.body.title,
    description: req.body.description,
    genreTags: req.body.tags,
    startTime: new Date(startDate),
    endTime: new Date(endDate),
    location: req.body.location,
    participantSize: "1",
    participants: [req.body.user],
    group: mongoose.Types.ObjectId(req.body.group),
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

router.patch("/removeParticipant", function (req, res, next) {
  Event.findOneAndUpdate(
    { _id: req.body._id },
    { $pull: { participants: req.body.participant } }
  )
    .then(() => res.send("success"))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

router.patch("/delete", function (req, res, next) {
  console.log(req.body._id);
  Event.findOneAndDelete({ _id: req.body._id })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
