const { getContacts } = require("../../services/contacts");

const getContactsCtrl = async (req, res) => {
  const contacts = await getContacts();

  return res.json({
    status: "success",
    code: 200,
    message: "Contacts found successfully",
    data: { contacts: contacts },
  });
};

module.exports = getContactsCtrl;
