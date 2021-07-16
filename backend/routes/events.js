var express = require("express");
var router = express.Router();
const Event = require("../models/event")
var mongoose = require('mongoose');

/* GET events listing. */
router.get("/", function (req, res, next) {
  Event.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res
        .status(500)
        .send({
          message: error.message || "There was an error while getting events",
        });
    });
});

router.post("/", function (req, res, next) {
  const newEvent = new Event({
    creator: mongoose.Types.ObjectId("51c35e5ced18cb901d000001"),
    title: "title",
    description: "description",
    genreTags: ["basketball"],
    startTime: new Date(),
    endTime: new Date(),
    location: "location",
    participantSize: "0",
    participants: [],
    group: mongoose.Types.ObjectId("51c35e5ced18cb901d000001"),
    status: "status",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  newEvent.save((error) => {
    if (error) {
      console.log("Ooops, something happened to event POST");
      res.send(error)
    } else {
      console.log("POST event successful");
      res.send(req.body);
    }
  });
});

// router.patch("/comment", function (req, res, next) {
//   Event.findOneAndUpdate({_id: req.body._id}, 
//     {$push: {comments: req.body.comment}}, )
//     .then(() => res.send('success'))
//     .catch((err) => {
//       res.status(500).send({message: err.message});
//     })
// })

// router.patch("/participant", function (req, res, next) {
//   Event.findOneAndUpdate({_id: req.body._id}, 
//     {$push: {participants: req.body.participant}}, )
//     .then(() => res.send('success'))
//     .catch((err) => {
//       res.status(500).send({message: err.message});
//     })
// })

router.patch("/comment", function (req, res, next) {
  Event.findOneAndUpdate({_id: req.body._id}, 
    {$push: {comments: req.body.comment}}, )
    .then(() => res.send({}))
    .catch((err) => {
      res.send({});
    })
})

router.patch("/participant", function (req, res, next) {
  Event.findOneAndUpdate({_id: req.body._id}, 
    {$push: {participants: req.body.participant}}, )
    .then(() => res.send({}))
    .catch((err) => {
      res.send({});
    })
})

module.exports = router;
