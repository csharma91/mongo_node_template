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
    type: [String]
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

  avatar: {
    type: String
  },

  articleImage: {
    type: String
  },

  sentimentScore1: {
    type: Number
  },

  sentimentScore2: {
    type: Number
  },

  sentimentScore3: {
    type: Number
  },

  sentimentType: {
    type: String
  },

  keywords: {
    type: [String]
  },

  date: {
    type: Date,
    default: Date.now
  },

  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      urlToImage: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model("stockfeed", StockfeedSchema);
