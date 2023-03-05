const { addContact } = require("../../services/contactsServices");
const { responseOk } = require("../../helpers/responses");

const addContactCtrl = async (req, res) => {
  const { _id: owner } = req.user;

  const newContact = await addContact(req.body, owner);

  return res.json(
    responseOk("success", 201, "contact added successfully", newContact)
  );
};

module.exports = addContactCtrl;
