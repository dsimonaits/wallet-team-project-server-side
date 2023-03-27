const express = require("express");
const path = require("path");
// const { catchAsync } = require("../../helpers/errors");
const avatars = path.resolve("public/avatars");
const router = express.Router();

router.use("/", express.static(avatars));

module.exports = router;
