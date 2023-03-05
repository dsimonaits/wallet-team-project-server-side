const Contacts = require("../../models/contactModel");

const addContact = async (body, owner) => {
  const newContact = await Contacts.create({ ...body, owner });

  return newContact;
};

module.exports = addContact;
