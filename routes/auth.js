const express = require("express");

const router = express.Router();

//Sert a poster (add qqch)
// @ROUTE   GET api/auth
// @desc    gett logged in user
// @access  Private

router.get("/", (req, res) => {
  res.send("Get logged in user");
});

/**
 * @route   POST api/auth
 * @desc    Auth user @ get Token
 * @access  Public
 */
router.post("/", (req, res) => {
  res.send("Log in user");
});

module.exports = router;
