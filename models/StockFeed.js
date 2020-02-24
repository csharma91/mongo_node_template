const mongoose = require("mongoose");

const StockfeedSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String
  },

  companyTags: {
    type: String
  },

  likeCount: {
    type: Number
  },
  commentCount: {
    type: Number
  },

  url: {
    type: String
  },

  urlToImage: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("stockfeed", StockfeedSchema);
