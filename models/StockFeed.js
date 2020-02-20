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
  description: {
    type: String
  },
  url: {
    type: String,
    default: "https://techcrunch.com/"
  },
  urlToImage: {
    type: String,
    default:
      "https://i1.wp.com/www.nationalreview.com/wp-content/uploads/2019/10/donald-trump-marine-one.jpg?fit=789%2C460&ssl=1"
  },
  source: {
    type: String,
    default: "csharma"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("stockfeed", StockfeedSchema);
