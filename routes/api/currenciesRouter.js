const express = require("express");
const { catchAsync } = require("../../helpers/errors");
const router = express.Router();
const { currenciesApiCtrl } = require("../../controllers/currenciesApi");

router.get("/", catchAsync(currenciesApiCtrl));

module.exports = router;
