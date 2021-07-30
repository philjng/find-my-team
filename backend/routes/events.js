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

router.get("/search/:text", function (req, res, next) {
  //TODO: Create search query
  Event.find()
  .then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.status(500).send({
      message: error.message || "There was an error while getting event",
    });
  });
});

router.post("/", function (req, res, next) {
  console.log(req.body);
  const newEvent = new Event({...req.body,
    creator: req.body.user.uid,
    startTime: new Date(req.body.start),
    endTime: new Date(req.body.end),
    participantSize: "1",
    participants: [req.body.user],
    group: mongoose.Types.ObjectId(req.body.group),
    status: "status",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log("done");
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

router.patch("/:id/comments", function (req, res, next) {
  Event.findByIdAndUpdate(req.params.id, {
    $push: { comments: req.body.comment },
  })
    .then(() => res.send("success"))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

router.patch("/:id/participants", function (req, res, next) {
  Event.findByIdAndUpdate(req.params.id, {
    $push: { participants: req.body.participant },
  })
    .then(() => res.send("success"))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

router.patch("/:id/removeParticipant", function (req, res, next) {
  Event.findByIdAndUpdate( req.params.id, { 
    $pull: { participants: req.body.participant } }
  )
    .then(() => res.send("success"))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

router.delete("/:id", function (req, res, next) {
  Event.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

module.exports = router;
