const express = require("express");
const router = express.Router();

//On appele le model
const User = require("../models/Users");

//Express-validatoir
const { check, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
//Sert a poster (add qqch)
// @ROUTE   POST api/users
// @desc    Register a user
// @access Public

//Pour etre sur que du data soit envoyé, on va utiliser express-validator
//Check Variable, ensuite message d'erreur, s'il n'est pas vide => combinaise de not et isEmpty
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(), //Si le nom est vide
    check("email", "Please include a valid email").isEmail(), //doit avoir un format email
    check(
      //Check la longueur du mot de passe (rajouter du regex)
      "password",
      "Please enter a password with 6 or more characters",
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req); // On lance la validation

    if (!errors.isEmpty()) {
      //Display des erreur
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body; //On deconstruct ce qu'il y'a dans la requete

    try {
      let user = await User.findOne({ email: email }); //On le cherche, possible avec mongooseSchema
      if (user) {
        res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10); //Permet de crypter un pwd
      user.password = await bcrypt.hash(password, salt);

      await user.save(); //On attend que l'utilisateur soit enregistré

      res.send("User saved");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
);

module.exports = router;
