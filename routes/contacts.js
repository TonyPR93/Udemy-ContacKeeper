const express = require("express");

const router = express.Router();

//On appele le model
const User = require("../models/Users");
const Contact = require("../models/Contact");
//Express-validatoir
const { check, validationResult } = require("express-validator");

//
const auth = require("../middleware/auth");
//Sert a poster (add qqch)
/**
 * @route   Get api/contacts
 * @desc    Get all users contacts
 * @access  Private
 */

//On prend tous les contact associés à l'utilisateur
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    }); //Await attend une reponse (c'est une promesse)
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route   POST api/contacts
 * @desc    Add new contacts
 * @access  Private
 */

router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Please include a valid email").isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req); // On lance la validation

    if (!errors.isEmpty()) {
      //Display des erreur
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id, //accessible depuis auth
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
);

/**
 * @route   PUT api/contacts/:id
 * @desc    Update contact
 * @access  Private
 */

router.put("/:id", auth, async (req, res) => {
  const errors = validationResult(req); // On lance la validation

  if (!errors.isEmpty()) {
    //Display des erreur
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, phone, type } = req.body;

  //Build a contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "contact not found" });
    //Make sure user owns contact, on regarde si la colonne user contient bien le même id que retenue dans l'auth
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true },
    );

    res.json(contact); //Ne pas oublier la reponse sinon l'api tourne en boucle !!!
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route   DELETE api/contacts/:id
 * @desc    Delete contacts
 * @access  Private
 */

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "contact not found" });
    //Make sure user owns contact, on regarde si la colonne user contient bien le même id que retenue dans l'auth
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact deleted" }); //Ne pas oublier la reponse sinon l'api tourne en boucle !!!
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
