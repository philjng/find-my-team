var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const EventSchema = new Schema({
  creatorId: String,
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
  lastModified: Date,
  comments: [Object],
});
EventSchema.index({'$**': 'text'});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
