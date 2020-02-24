const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const User = require("../models/User");
// Auth Middleware
const auth = require("../middleware/auth");

const StockFeed = require("../models/StockFeed");

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
