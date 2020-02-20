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

//FOR TESTING ONLY
//@route GET api/stockfeed/all
//@desc Get all user stockfeed
//@access Public

router.get("/all", async (req, res) => {
  try {
    const stockfeeds = await StockFeed.find({
      user: "5e4e03862dcd6172b1664525"
    }).sort({
      date: -1
    });
    res.json(stockfeeds);
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
      description,
      url,
      urlToImage,
      source,
      date
    } = req.body;
    try {
      const newStockFeed = new StockFeed({
        author,
        title,
        description,
        url,
        urlToImage,
        source,
        date,
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
