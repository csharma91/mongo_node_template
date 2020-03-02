const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

// Auth Middleware
const auth = require("../middleware/auth");

// Models
const User = require("../models/User");
const StockFeed = require("../models/StockFeed");
const StockFeedLikes = require("../models/StockFeedLikes");

//@route GET api/stockfeeds
//@desc Get all user stockfeeds
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    const stockfeeds = await StockFeed.find({ user: req.user.id }).sort({
      sentimentScore1: -1
    });

    res.json(stockfeeds);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api/stockfeeds/:id
//@desc Get Stockfeed by ID
//@access Private

router.get("/:id", auth, async (req, res) => {
  try {
    let stockfeed = await StockFeed.findById(req.params.id);
    if (!stockfeed) return res.status(404).json({ msg: "Stockfeed not Found" });
    res.json(stockfeed);
    // Make Sure User owns Stockfeed
    if (stockfeed.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/stockfeeds/:id
//@desc     DELETE Stockfeed by ID
//@access   Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let stockfeed = await StockFeed.findById(req.params.id);
    if (!stockfeed) return res.status(404).json({ msg: "Stockfeed not Found" });

    // Make Sure User owns Stockfeed
    if (stockfeed.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await stockfeed.remove();
    res.json({ msg: "Stockfeed Removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/stockfeed
//@desc  Create a Stockfeed
//@access Private

router.post(
  "/",
  [
    auth,
    [
      check("body", "Body is required")
        .not()
        .isEmpty(),
      check("title", "Title is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, body, companyTags, url, articleImage } = req.body;

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newStockFeed = {};
      newStockFeed.user = req.user.id;
      newStockFeed.author = user.name;
      newStockFeed.avatar = user.avatar;
      newStockFeed.postType = "post";
      newStockFeed.postTypeImage =
        "https://lh3.googleusercontent.com/proxy/wKMqMhd2vTIbCpXGRucEb4wfX8pr7eHY70mLtTbw2apAsph0BozEmzmLe-VD1JFxBoyDnFr45xguoyAI8CPRNupsqoTxvZE";
      if (title) {
        newStockFeed.title = title;
      }
      if (body) {
        newStockFeed.body = body;
      }
      if (url) {
        newStockFeed.url = url;
      }
      if (articleImage) {
        newStockFeed.articleImage = articleImage;
      }
      if (companyTags) {
        newStockFeed.companyTags = companyTags
          .split(",")
          .map(comp => comp.trim());
      }

      //Create Stock Feed
      stockfeed = new StockFeed(newStockFeed);
      await stockfeed.save();
      res.json(stockfeed);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET /:id/like
//@desc     Like a Stockfeed
//@access   Private

router.put("/:id/like", auth, async (req, res) => {
  try {
    const stockfeed = await StockFeed.findById(req.params.id);

    //Check if Stockfeed has already been liked

    if (
      stockfeed.likes.filter(like => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Already Liked!" });
    }
    stockfeed.likes.unshift({ user: req.user.id });
    await stockfeed.save();
    res.json(stockfeed.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /:id/unlike
//@desc     Like a Stockfeed
//@access   Private

router.put("/:id/unlike", auth, async (req, res) => {
  try {
    const stockfeed = await StockFeed.findById(req.params.id);

    //Check if Stockfeed has already been liked

    if (
      stockfeed.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked" });
    }

    //Get remove Index
    const removeIndex = stockfeed.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    stockfeed.likes.splice(removeIndex, 1);

    await stockfeed.save();
    res.json(stockfeed.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/stockfeed/comment
//@desc  Comment on a Stockfeed
//@access Private

router.post(
  "/:id/comment",
  [
    auth,
    [
      check("text", "Text Body is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const stockfeed = await StockFeed.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        author: user.name,
        urlToImage: user.avatar,
        user: req.user.id
      };
      stockfeed.comments.unshift(newComment);
      await stockfeed.save();
      res.json(stockfeed.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route  DELETE api/stockfeed/:id/:comment_id/comment
//@desc   Delete Comment
//@access Private
router.delete("/:id/:comment_id/comment", auth, async (req, res) => {
  try {
    const stockfeed = await StockFeed.findById(req.params.id);

    //Pull Out Comment
    const comment = stockfeed.comments.find(
      comment => comment.id === req.params.comment_id
    );
    // Make Sure Comment Exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exists" });
    }

    //Check User
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    //Get remove Index
    const removeIndex = stockfeed.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);
    stockfeed.comments.splice(removeIndex, 1);

    await stockfeed.save();
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/contacts/:id
//@desc Update Contact
//@access Private

router.put("/:id", (req, res) => {
  res.send("Update User Contacts");
});

//@route DELETE api/contacts/:id
//@desc Delete Contact
//@access Private

module.exports = router;
