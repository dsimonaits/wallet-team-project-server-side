const express = require("express");
const { catchAsync } = require("../../helpers/errors");
const router = express.Router();

const testMessageCtrl = require("../../controllers/testCtrl/testMessageCtrl.js");

router.post("/", catchAsync(testMessageCtrl));

module.exports = router;
