const { updateContact } = require("../../services/contacts");

const updateContactCtrl = async (req, res) => {
  const { contactId } = req.params;

  const body = req.body;

  const updatedContact = await updateContact(contactId, body);

  return res.json({
    status: "success",
    code: 201,
    message: "Contact updated successfully",
    data: { contacts: updatedContact },
  });
};

module.exports = updateContactCtrl;
