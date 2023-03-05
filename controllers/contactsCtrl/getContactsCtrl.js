const { getContacts } = require("../../services/contactsServices");
const { responseOk } = require("../../helpers/responses");

const getContactsCtrl = async (req, res) => {
  const { _id: owner } = req.user;

  let { page = 1, limit = 5, favorite } = req.query;

  limit = parseInt(limit) > 5 ? 5 : parseInt(limit);
  page = parseInt(page);

  const contacts = await getContacts(owner, { page, limit, favorite });

  if (contacts.length === 0) {
    return res.json(
      responseOk("success", 200, "No contacts found, add someone")
    );
  }

  return res.json(
    responseOk("success", 200, "Contacts found successfully", contacts)
  );
};

module.exports = getContactsCtrl;
