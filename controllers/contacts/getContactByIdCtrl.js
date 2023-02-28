const { getContactById } = require("../../services/contacts");
const { WrongParametersError } = require("../../utils");

const getContactByIdCtrl = async (req, res, next) => {
  const { contactId } = req.params;

  const contactById = await getContactById(contactId);

  if (!contactById) {
    throw new WrongParametersError(
      `Failure, no posts with id '${contactId}' found!`
    );
  }
  return res.json({
    status: "success",
    code: 200,
    message: "Contact found successfully",
    data: { contactById },
  });
};

module.exports = getContactByIdCtrl;
