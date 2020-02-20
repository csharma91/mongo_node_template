const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const User = require("../models/User");
// Auth Middleware
const auth = require("../middleware/auth");

const Contact = require("../models/Contact");

//@route GET api/contacts
//@desc Get all user contacts
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//FOR TESTING ONLY
//@route GET api/contacts/all
//@desc Get all user contacts
//@access Public

router.get("/all", async (req, res) => {
  try {
    const contacts = await Contact.find({ user: '5e4df0d19ce22b6e76a5ccc4' }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/contacts
//@desc Get all user contacts
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
  async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact  = await newContact.save()
      res.json(contact)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
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
