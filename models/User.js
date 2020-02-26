const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default:
      "https://www.shitpostbot.com/img/sourceimages/rick-sanchez-57d788786ff11.jpeg"
  }
});

module.exports = mongoose.model("user", UserSchema);
