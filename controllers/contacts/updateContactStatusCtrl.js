const {
  getContactById,
  updateContactStatus,
} = require("../../services/contacts");
const { WrongParametersError } = require("../../utils");

const updateContactStatusCtrl = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const contactById = await getContactById(contactId);

  if (!contactById) {
    throw new WrongParametersError(
      `Failure, no posts with id '${contactId}' found!`
    );
  }

  if (!favorite) {
    throw new WrongParametersError("Missing field favorite!");
  }

  const updatedContact = await updateContactStatus(contactId, favorite);

  return res.json({
    status: "success",
    code: 201,
    message: "Contact status updated successfully",
    data: { contacts: updatedContact },
  });
};

module.exports = updateContactStatusCtrl;
