const mongoose = require("mongoose");

const StockfeedLikesSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  stockfeedId: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("stockfeedLikes", StockfeedLikesSchema);
