const { updateContact } = require("../../services/contactsServices");
const { responseOk } = require("../../helpers/responses");

const updateContactCtrl = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const body = req.body;

  const updatedContact = await updateContact(contactId, owner, body);

  return res.json(
    responseOk("success", 201, "Contact updated successfully", updatedContact)
  );
};

module.exports = updateContactCtrl;
