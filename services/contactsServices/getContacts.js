const Contacts = require("../../models/contactModel");

const getContacts = async (owner, { page, limit, favorite }) => {
  const skip = page === 1 ? 0 : (page - 1) * limit;

  const contacts = await Contacts.find({
    owner,
    favorite: favorite || { $in: [true, false] },
  })
    .skip(skip)
    .limit(limit);

  return contacts;
};

module.exports = getContacts;
