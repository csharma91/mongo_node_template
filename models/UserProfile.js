const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  location: {
    type: String
  },
  stocks: {
    type: String
  },
  newssource: {
    type: String
  },

  lastupdatedate: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = mongoose.model("userProfile", UserSchema);
