const getContacts = require("./getContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContact = require("./updateContact");
const updateContactStatus = require("./updateContactStatus");
const deleteContact = require("./deleteContact");

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  deleteContact,
};
