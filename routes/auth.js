const express = require("express");

const router = express.Router();

//On appele le model
const User = require("../models/Users");

//Express-validatoir
const { check, validationResult } = require("express-validator");

//Crypt
const bcrypt = require("bcryptjs");

//JWT
const jwt = require("jsonwebtoken");
const config = require("config");

//Middleware
const auth = require("../middleware/auth");

//Sert a poster (add qqch)
// @ROUTE   GET api/auth
// @desc    gett logged in user
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route   POST api/auth
 * @desc    Auth user @ get Token
 * @access  Public
 */
router.post(
  "/",
  [
    check("email", "Please include a valid Email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req); // On lance la validation

    if (!errors.isEmpty()) {
      //Display des erreur
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
);

module.exports = router;
