const { updateContactStatus } = require("../../services/contactsServices");
const { WrongParametersError } = require("../../helpers/errors");
const { responseOk } = require("../../helpers/responses");

const updateContactStatusCtrl = async (req, res) => {
  const { contactId } = req.params;
  const { _id: ownerId } = req.user;
  const { favorite } = req.body;

  if (!favorite) {
    throw new WrongParametersError("Missing field favorite!");
  }

  const updatedContact = await updateContactStatus(
    contactId,
    ownerId,
    favorite
  );

  return res.json(
    responseOk(
      "success",
      201,
      "Contact status updated successfully",
      updatedContact
    )
  );
};

module.exports = updateContactStatusCtrl;
