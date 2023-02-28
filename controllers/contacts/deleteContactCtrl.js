const { deleteContact } = require("../../services/contacts");

const deleteContactCtrl = async (req, res) => {
  try {
    const { contactId } = req.params;

    const deletedContact = await deleteContact(contactId);

    if (!deletedContact)
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
        data: null,
      });

    return res.json({
      message: "Contact deleted successfully",
    });
  } catch (error) {}
};

module.exports = deleteContactCtrl;
