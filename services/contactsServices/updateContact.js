const Contacts = require("../../models/contactModel");
const { NotFound } = require("../../helpers/errors");

const updateContact = async (id, owner, body) => {
  const updatedContact = await Contacts.findByIdAndUpdate(
    {
      _id: id,
      owner,
    },
    body,
    {
      new: true,
    }
  );

  if (!updatedContact) throw new NotFound("Not found");

  return updatedContact;
};

module.exports = updateContact;
