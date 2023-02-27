const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    unique: true,
    default: "not provided",
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "Set phone number for contact"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contacts = mongoose.model("contacts", contactsSchema);

module.exports = Contacts;
