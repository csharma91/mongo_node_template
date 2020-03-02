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

  postType: {
    type: String,
    required: true
  },

  postTypeImage: {
    type: String
  },

  avatar: {
    type: String
  },
  url: {
    type: String
  },

  articleImage: {
    type: String
  },

  companyTags: {
    type: [String]
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

  likeCount: {
    type: Number
  },
  commentCount: {
    type: Number
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
      author: {
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
