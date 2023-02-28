const Contacts = require("../models/contactModel");

const getContacts = async () => {
  const contacts = await Contacts.find();

  return contacts;
};

const getContactById = async (id) => {
  const contactById = await Contacts.findById({ _id: id });

  return contactById;
};

const addContact = async (body) => {
  const newContact = await Contacts.create(body);

  return newContact;
};

const updateContact = async (id, body) => {
  const updatedContact = await Contacts.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });

  return updatedContact;
};

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

const deleteContact = async (id) => {
  const deleteContact = await Contacts.findByIdAndRemove(id);

  return deleteContact;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  deleteContact,
};
