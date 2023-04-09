const express = require("express");
const { catchAsync } = require("../../helpers/errors");
const { authMiddleware } = require("../../middlewares");
const router = express.Router();
const {
  transactionCreateCtrl,
  transactionDeleteCtrl,
  transactionGetCategoryCtrl,
  transactionGetAllCtrl,
  transactionUpdateCtrl,
} = require("../../controllers/transaction");
const { validationUpdateTransaction } = require("../../helpers/validation");

router.use(authMiddleware);

router.post("/create", catchAsync(transactionCreateCtrl));
router.delete("/delete", catchAsync(transactionDeleteCtrl));
router.get("/category", catchAsync(transactionGetCategoryCtrl));
router.get("/getAll", catchAsync(transactionGetAllCtrl));
router.put(
  "/update/:transactionId",
  validationUpdateTransaction,
  catchAsync(transactionUpdateCtrl)
);

module.exports = router;
