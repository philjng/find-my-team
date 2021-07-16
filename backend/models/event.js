var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const EventSchema = new Schema({
  creator: String,
  title: String,
  description: String,
  genreTags: [String],
  startTime: Date,
  endTime: Date,
  location: String,
  participantSize: Number,
  participants: [Object],
  group: Schema.Types.ObjectId,
  status: String,
  createdAt: Date,
  updatedAt: Date,
  comments: [Object]
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
