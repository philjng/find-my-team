var express = require("express");
var router = express.Router();

const Group = require("../models/group");
const User = require("../models/user");

/* GET groups listing by latest creation date. */
router.get("/", function (req, res, next) {
  Group.find()
    .sort({ createdAt: -1 })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "There was an error while getting groups",
      });
    });
});

/* GET user created groups */
router.get("/created", function (req, res, next) {
  Group.find({ creatorId: req.query.userId })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "There was an error while getting groups",
      });
    });
});

/* GET user joined groups */
router.get("/joined", function (req, res, next) {
  Group.find({
    memberIds: req.query.userId,
    creatorId: { $ne: req.query.userId },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        message: error.message || "There was an error while getting groups",
      });
    });
});

router.get("/:id", function (req, res, next) {
  Group.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "There was an error while getting event",
      });
    });
});

/* POST endpoint: Create group */
router.post("/", function (req, res, next) {
  const newGroup = new Group(req.body);
  newGroup.save((error) => {
    if (error) {
      res.status(500).send({ message: error.message || "POST group failed" });
    } else {
      res.send(newGroup);
    }
  });
});

router.delete("/:id", function (req, res, next) {
  Group.deleteOne({ _id: req.params.id })
    .then(() => {
      res.send(req.params.id);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({ message: e.message || "DELETE group failed" });
    });
});

/* PUT endpoint to update group - add or remove member */
router.put("/:id", function (req, res, next) {
  // TODO: find new method - current one without the 'useFindAndModify' option set to false is deprecated
  const newGroup = req.body;
  Group.findById(req.params.id, (err, group) => {
    if (err) {
      res.status(err.code).send(err);
    } else {
      if (
        group.lastModified === undefined ||
        newGroup.lastModified === undefined ||
        new Date(newGroup.lastModified).getTime() ===
          new Date(group.lastModified).getTime()
      ) {
        newGroup.lastModified = new Date();
        Group.findByIdAndUpdate(
          req.params.id,
          newGroup,
          { new: true, useFindAndModify: false },
          (error, result) => {
            if (error) {
              res.status(error.code).send(error);
            } else {
              res.send(req.body);
            }
          }
        );
      } else {
        res.status(400).send({
          status: 400,
          message: "Resource was modified. Try again.",
        });
      }
    }
  });
});

/* GET group members */
router.get("/:id/members", function (req, res, next) {
  Group.findById(req.params.id)
    .then((groupData) => {
      return User.find({
        _id: {
          $in: groupData.memberIds,
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

router.get("/search/:text", function (req, res, next) {
  const searchText = req.params.text;
  Group.find(
    { $text: { $search: searchText } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "There was an error while getting group",
      });
    });
});

module.exports = router;
