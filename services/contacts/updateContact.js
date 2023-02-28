const Contacts = require("../../models/contactModel");

const updateContact = async (id, body) => {
  const updatedContact = await Contacts.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });

  return updatedContact;
};

module.exports = updateContact;
