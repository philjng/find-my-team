var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const EventSchema = new Schema({
  creator: Schema.Types.ObjectId,
  title: String,
  description: String,
  genreTags: [String],
  startTime: Date,
  endTime: Date,
  location: String,
  participantSize: Number,
  participants: [Schema.Types.ObjectId],
  group: Schema.Types.ObjectId,
  status: String,
  createdAt: Date,
  updatedAt: Date,
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
