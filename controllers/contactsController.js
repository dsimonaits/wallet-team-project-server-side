const contacts = require("../models/contacts");
const nodeId = require("node-id");
const deepTrim = require("deep-trim");

const contactsList = async (req, res) => {
  try {
    const contactsList = await contacts.listContacts();
    res.status(200).json(contactsList);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const contactById = async (req, res) => {
  const contactId = req.params.contactId;
  try {
    const contactById = await contacts.getContactById(contactId);

    if (!contactById) return res.status(404).json({ message: "Not found" });

    res.status(200).json(contactById);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const contactCreate = async (req, res) => {
  const { name, email, phone } = await deepTrim(req.body);

  try {
    const body = {
      id: nodeId(),
      name,
      email,
      phone,
    };

    const newContact = await contacts.addContact(body);
    return res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const contactDelete = async (req, res) => {
  const contactId = req.params.contactId;

  try {
    const deletedContact = await contacts.removeContact(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const contactUpdate = async (req, res) => {
  const contactId = req.params.contactId;

  const { name, email, phone } = await deepTrim(req.body);

  try {
    const body = {
      name,
      email,
      phone,
    };

    const updatedContact = await contacts.updateContact(contactId, body);

    if (!updatedContact) return res.status(404).json({ message: "Not found" });

    if (updatedContact) return res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  contactsList,
  contactById,
  contactCreate,
  contactDelete,
  contactUpdate,
};
