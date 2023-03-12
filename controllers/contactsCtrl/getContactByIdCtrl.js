const { getContactById } = require("../../services/contactsServices");
const { responseOk } = require("../../helpers/responses");

const getContactByIdCtrl = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const contactById = await getContactById(contactId, owner);

  return res.json(
    responseOk("success", 200, "Contact found successfully", contactById)
  );
};

module.exports = getContactByIdCtrl;
