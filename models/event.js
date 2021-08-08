var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const EventSchema = new Schema({
  creatorId: String,
  creator: String,
  title: String,
  location: String,
  description: String,
  startTime: Date,
  endTime: Date,
  participantSize: Number,
  participants: [String],
  group: Schema.Types.ObjectId | String,
  tags: [String],
  status: String,
  createdAt: Date,
  lastModified: Date,
  comments: [Object],
});
EventSchema.index({'$**': 'text'});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
