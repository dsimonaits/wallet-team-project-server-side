const Contacts = require("../../models/contactModel");

const deleteContact = async (id) => {
  const deleteContact = await Contacts.findByIdAndRemove(id);

  return deleteContact;
};

module.exports = deleteContact;
