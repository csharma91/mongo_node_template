const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

// Auth Middleware
const auth = require("../middleware/auth");

// Models
const User = require("../models/User");
const StockFeed = require("../models/StockFeed");
const UserProfile = require("../models/UserProfile");

//@route GET api/stockfeeds
//@desc Get all user stockfeeds
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    const userprofile = await UserProfile.find({ user: req.user.id }).sort({
      date: -1
    });
    const stockList = userprofile[0].stocks;

    const news = await res.json(stockList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
