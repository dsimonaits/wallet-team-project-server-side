const express = require("express");

const createValidator = require("../../middlewares/joi/create.validator");
const updateValidator = require("../../middlewares/joi/update.validator");
const contactsController = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", contactsController.contactsList);

router.get("/:contactId", contactsController.contactById);

router.post("/", createValidator, contactsController.contactCreate);

router.delete("/:contactId", contactsController.contactDelete);

router.put("/:contactId", updateValidator, contactsController.contactUpdate);

module.exports = router;
