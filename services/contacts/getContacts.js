const Contacts = require("../../models/contactModel");

const getContacts = async () => {
  const contacts = await Contacts.find();

  return contacts;
};

module.exports = getContacts;
