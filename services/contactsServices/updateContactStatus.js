const Contacts = require("../../models/contactModel");
const { NotFound } = require("../../helpers/errors");

const updateContactStatus = async (id, ownerId, status) => {
  const updatedContact = await Contacts.findByIdAndUpdate(
    { _id: id, ownerId },
    { favorite: status },
    {
      new: true,
    }
  );

  if (!updatedContact) {
    throw new NotFound("Not found");
  }

  return updatedContact;
};

module.exports = updateContactStatus;
