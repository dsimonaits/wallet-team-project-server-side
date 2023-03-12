const express = require("express");
const router = express.Router();
const { catchAsync } = require("../../helpers/errors");
const {
  signUpCtrl,
  signInCtrl,
  logoutCtrl,
  currentCtrl,
  updateSubscriptionStatusCtrl,
} = require("../../controllers/authCtrl");
const {
  registerValidator,
  loginValidator,
  userUpdateValidator,
} = require("../../middlewares/joi");
const auth = require("../../middlewares/auth");

router.post("/signup", registerValidator, catchAsync(signUpCtrl));
router.post("/signin", loginValidator, catchAsync(signInCtrl));
router.post("/logout", auth, catchAsync(logoutCtrl));
router.post("/current", auth, catchAsync(currentCtrl));
router.patch(
  "/",
  auth,
  userUpdateValidator,
  catchAsync(updateSubscriptionStatusCtrl)
);

module.exports = router;
