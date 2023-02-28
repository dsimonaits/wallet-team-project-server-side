const { addContact } = require("../../services/contacts");

const addContactCtrl = async (req, res) => {
  const newContact = await addContact(req.body);

  return res.json({
    status: "success",
    code: 201,
    message: "contact added successfully",
    data: { contacts: newContact },
  });
};

module.exports = addContactCtrl;
