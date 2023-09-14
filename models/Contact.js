const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  //Relationship entre contact et user (un user a plusieurs contact)
  user: {
    type: mongoose.Schema.Types.ObjectId, //Le schema sera composé de l'id de l'utilisateur(genere par mongodb)
    ref: "users", //la collection concerné
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: "Personal",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contact", ContactSchema);
