var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  tags: [String],
  emailAddress: String,
  displayName: String,
  lastModified: Date,
  image: String,
  _id: String,
});
UserSchema.index({'$**': 'text'});

const User = mongoose.model("User", UserSchema);

module.exports = User;
