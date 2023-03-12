const Contacts = require("../../models/contactModel");
const { NotFound } = require("../../helpers/errors");

const getContactById = async (id, owner) => {
  const contactById = await Contacts.findOne({ _id: id, owner });

  if (!contactById) {
    throw new NotFound("Not found");
  }

  return contactById;
};

module.exports = getContactById;
