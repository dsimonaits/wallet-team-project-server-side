const Contacts = require("../../models/contactModel");

const updateContactStatus = async (id, status) => {
  const updatedContact = await Contacts.findByIdAndUpdate(
    { _id: id },
    { favorite: status },
    {
      new: true,
    }
  );

  return updatedContact;
};

module.exports = updateContactStatus;
