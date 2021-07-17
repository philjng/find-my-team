var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  tags: [String],
  emailAddress: String,
  username: String,
  eventsJoined: [Schema.Types.ObjectId],
  eventsCreated: [Schema.Types.ObjectId],
  groupsJoined: [Schema.Types.ObjectId],
  groupsCreated: [Schema.Types.ObjectId],
  _id: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
