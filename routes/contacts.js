const express = require("express");

const router = express.Router();

//Sert a poster (add qqch)
/**
 * @route   Get api/contacts
 * @desc    Get all users contacts
 * @access  Private
 */

router.get("/", (req, res) => {
  res.send("Get all contacts");
});

/**
 * @route   POST api/contacts
 * @desc    Add new contacts
 * @access  Private
 */

router.post("/", (req, res) => {
  res.send("Add contact");
});

/**
 * @route   PUT api/contacts/:id
 * @desc    Update contact
 * @access  Private
 */

router.put("/:id", (req, res) => {
  res.send("Updated contact");
});

/**
 * @route   DELETE api/contacts/:id
 * @desc    Delete contacts
 * @access  Private
 */

router.delete("/:id", (req, res) => {
  res.send("Deleted contact");
});

module.exports = router;
