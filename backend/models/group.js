var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const GroupSchema = new Schema({
  creatorId: String,
  creator: String,
  name: String,
  description: String,
  tags: [String],
  createdAt: Date,
  memberIds: [String],
  groupSize: Number,
});
// GroupSchema.index({'$**': 'text'});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;