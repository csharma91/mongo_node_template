const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

// Mongo DB Model
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");
const Contact = require("../models/Contact");

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

//FOR TESTING ONLY
//@route GET api/userprofile/test
//@desc Get test User Profile
//@access Public

router.get("/test", async (req, res) => {
  try {
    const userProfile = await UserProfile.find({
      user: "5e4f832ad3438a9081ee75dd"
    }).sort({
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

router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, bio, location, stocks, newssource } = req.body;
    try {
      const newUserProfile = new UserProfile({
        name,
        bio,
        location,
        stocks,
        newssource,
        user: req.user.id
      });
      const userProfile = await newUserProfile.save();
      res.json(userProfile);
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
