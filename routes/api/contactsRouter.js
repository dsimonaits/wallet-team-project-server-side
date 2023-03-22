const express = require("express");
const {
  createValidator,
  contactIdValidator,
  contactUpdateValidator,
} = require("../../middlewares/joi");
const { catchAsync } = require("../../helpers/errors");
const {
  getContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  updateContactCtrl,
  updateContactStatusCtrl,
  deleteContactCtrl,
} = require("../../controllers/contactsCtrl");

const router = express.Router();

router.get("/", catchAsync(getContactsCtrl));

router.get("/:contactId", contactIdValidator, catchAsync(getContactByIdCtrl));

router.post("/", createValidator, catchAsync(addContactCtrl));

router.delete("/:contactId", contactIdValidator, catchAsync(deleteContactCtrl));

router.put(
  "/:contactId",
  [contactIdValidator, contactUpdateValidator],
  catchAsync(updateContactCtrl)
);

router.put(
  "/:contactId/favorite",
  [contactIdValidator, contactUpdateValidator],
  catchAsync(updateContactStatusCtrl)
);

module.exports = router;
