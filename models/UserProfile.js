const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  title: {
    type: String
  },
  stocks: {
    type: [String]
  },
  newssource: {
    type: [String]
  },
  altsource: {
    type: [String]
  },
  region: {
    type: [String]
  },
  lastupdatedate: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  avatar: {
    type: String
  }
});

module.exports = mongoose.model("userProfile", UserSchema);
