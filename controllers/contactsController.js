const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  deleteContact,
} = require("../services/contactsService");
const { WrongParametersError } = require("../utils/errors");

const getContactsCtrl = async (req, res) => {
  const contacts = await getContacts();

  return res.json({
    status: "success",
    code: 200,
    message: "Contacts found successfully",
    data: { contacts: contacts },
  });
};

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
    data: { contacts: contactById },
  });
};

const addContactCtrl = async (req, res) => {
  const newContact = await addContact(req.body);

  return res.json({
    status: "success",
    code: 201,
    message: "contact added successfully",
    data: { contacts: newContact },
  });
};

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

module.exports = {
  getContactsCtrl,
  getContactByIdCtrl,
  deleteContactCtrl,
  addContactCtrl,
  updateContactCtrl,
  updateContactStatusCtrl,
};
