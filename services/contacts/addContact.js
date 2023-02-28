const Contacts = require("../../models/contactModel");

const addContact = async (body) => {
  const newContact = await Contacts.create(body);

  return newContact;
};

module.exports = addContact;
