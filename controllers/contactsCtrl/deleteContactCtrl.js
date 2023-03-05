const { deleteContact } = require("../../services/contactsServices");
const { responseOk } = require("../../helpers/responses");

const deleteContactCtrl = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  await deleteContact(contactId, owner);

  return res.json(responseOk("success", 200, "Contact deleted successfully"));
};

module.exports = deleteContactCtrl;
