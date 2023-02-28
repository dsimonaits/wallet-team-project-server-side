const Contacts = require("../../models/contactModel");

const getContactById = async (id) => {
  const contactById = await Contacts.findById({ _id: id });

  return contactById;
};

module.exports = getContactById;
