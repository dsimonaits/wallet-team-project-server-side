const Contacts = require("../../models/contactModel");
const { NotFound } = require("../../helpers/errors");

const deleteContact = async (id, owner) => {
  const deletedContact = await Contacts.findOneAndRemove({ id, owner });

  if (!deletedContact) throw new NotFound("Not found");
};

module.exports = deleteContact;
