const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

// Mongo DB Model
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");

// Auth Middleware
const auth = require("../middleware/auth");

//@route GET api/userprofile
//@desc Get User Profile Info
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    const userProfile = await UserProfile.find({ user: req.user.id }).sort({
      lastupdatedate: -1
    });
    res.json(userProfile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/userprofile
//@desc Add User Profile Info
//@access Private

router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { bio, title, stocks, newssource, altsource, region } = req.body;

  const user = await User.findById(req.user.id).select("-password");

  //Build Profile Object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (user.name) profileFields.name = user.name;
  if (bio) profileFields.bio = bio;
  if (title) profileFields.title = title;
  if (user.avatar) profileFields.avatar = user.avatar;

  if (stocks) {
    profileFields.stocks = stocks.split(",").map(stock => stock.trim());
  }

  if (newssource) {
    profileFields.newssource = newssource.split(",").map(news => news.trim());
  }

  if (altsource) {
    profileFields.altsource = altsource.split(",").map(source => source.trim());
  }

  if (region) {
    profileFields.region = region.split(",").map(reg => reg.trim());
  }
  try {
    let profile = await UserProfile.findOne({ user: req.user.id });

    // If Found porfile then update
    if (profile) {
      profile = await UserProfile.findByIdAndUpdate(
        { _id: profile.id },
        { $set: profileFields },
        { new: true }
      );
    }
    //Create Profile
    profile = new UserProfile(profileFields);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

  // console.log(profileFields.stocks);
  // console.log(profileFields.newssource);
  // console.log(profileFields.altsource);
  // res.send("Hello");
});

module.exports = router;
