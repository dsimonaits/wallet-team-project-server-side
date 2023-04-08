const express = require("express");
const { catchAsync } = require("../../helpers/errors");
const { authMiddleware } = require("../../middlewares");
const router = express.Router();
const {
  transactionCreateCtrl,
  transactionDeleteCtrl,
  transactionGetCategoryCtrl,
  transactionGetAllCtrl,
} = require("../../controllers/transaction");

router.use(authMiddleware);

router.post("/create", catchAsync(transactionCreateCtrl));
router.delete("/delete", catchAsync(transactionDeleteCtrl));
router.get("/category", catchAsync(transactionGetCategoryCtrl));
router.get("/getAll", catchAsync(transactionGetAllCtrl));

module.exports = router;
