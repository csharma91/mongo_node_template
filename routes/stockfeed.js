const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const User = require("../models/User");
// Auth Middleware
const auth = require("../middleware/auth");

const StockFeed = require("../models/StockFeed");
const StockFeedLikes = require("../models/StockFeedLikes");

//@route GET api/stockfeeds
//@desc Get all user stockfeeds
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    const stockfeeds = await StockFeed.find({ user: req.user.id }).sort({
      date: -1
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

//@route POST api/stockfeed
//@desc Get all user stockfeed
//@access Private

router.post(
  "/",
  [
    auth,
    [
      check("author", "Author is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      author,
      title,
      body,
      companyTags,
      likeCount,
      commentCount,
      url,
      urlToImage,
      user
    } = req.body;
    try {
      const newStockFeed = new StockFeed({
        author,
        title,
        body,
        companyTags,
        likeCount,
        commentCount,
        url,
        urlToImage,
        user: req.user.id
      });
      const stockfeed = await newStockFeed.save();
      res.json(stockfeed);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/stockfeeds/:id/like  == :id = stockfeedId/
// Exmaple User ID test = 5e4f832ad3438a9081ee75dd
//                 test2 = 5e536cc10c1275a3169cb4e7

//req.user is Authenticated User
//req.params.id is the stockfeed ID

router.get("/:id/like", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Logic for Like - only single user
  let likecheck_user = await StockFeedLikes.find({
    user: req.user.id.toString()
  });
  let likecheck_feed_id = await StockFeedLikes.find({
    stockfeedId: req.params.id.toString()
  });

  if (1 === 2) {
    // if (likecheck_feed_id.length !== 0 && likecheck_user.length !== 0) {
    return res.status(404).json({ msg: "You cannot like twice son" });
  } else {
    try {
      // Add Record to StockFeedLike Table
      const newStockFeedLike = new StockFeedLikes({
        name: req.user.name,
        stockfeedId: req.params.id.toString(),
        user: req.user.id.toString()
      });
      const stockfeedLike = await newStockFeedLike.save();
      res.json(stockfeedLike);

      // Increament Like Count in Stockfeeds Table
      let stockfeed = await StockFeed.find({ _id: req.params.id });
      let newLikeCount = stockfeed[0];
      newLikeCount.likeCount = stockfeed[0].likeCount + 1;
      newstockfeed = await StockFeed.findByIdAndUpdate(
        req.params.id,
        { $set: newLikeCount },
        { new: true }
      );
      // res.json(newLikeCount.likeCount);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
});

//@route GET api/stockfeeds/:id/unlike  == :id = stockfeedId/
// Exmaple User ID test = 5e4f832ad3438a9081ee75dd
//                 test2 = 5e536cc10c1275a3169cb4e7

//req.user is Authenticated User
//req.params.id is the stockfeed ID

router.get("/:id/unlike", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Logic for Like - only single user
  let likecheck_user = await StockFeedLikes.find({
    user: req.user.id.toString()
  });
  let likecheck_feed_id = await StockFeedLikes.find({
    stockfeedId: req.params.id.toString()
  });

  try {
    if (likecheck_feed_id.length !== 0 && likecheck_user.length !== 0) {
      let stockfeed = await StockFeed.find({ _id: req.params.id });
      let newLikeCount = stockfeed[0];
      newLikeCount.likeCount = stockfeed[0].likeCount - 1;
      newstockfeed = await StockFeed.findByIdAndUpdate(
        req.params.id,
        { $set: newLikeCount },
        { new: true }
      );
      newstockfeed_unlike = await StockFeedLikes.findByIdAndDelete(
        req.params.id
      );
      return res.status(200).json({ msg: "Unlike Successfull" });
    } else {
      return res.status(404).json({ msg: "You cannot unlike this." });
    }
  } catch (err) {
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

router.delete("/:id", (req, res) => {
  res.send("Delete User Contacts");
});

module.exports = router;
