const express = require("express");
const { catchAsync } = require("../../helpers/errors");
const router = express.Router();
const {
  transactionCreateCtrl,
  transactionDeleteCtrl,
} = require("../../controllers/transaction");

router.post("/create", catchAsync(transactionCreateCtrl));
router.delete("/delete", catchAsync(transactionDeleteCtrl));

module.exports = router;
