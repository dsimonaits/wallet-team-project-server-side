const express = require("express");
const router = express.Router();
const { catchAsync } = require("../../helpers/errors");
const {
  signUpCtrl,
  signInCtrl,
  logoutCtrl,
  currentCtrl,
  updateSubscriptionStatusCtrl,
  updateAvatarCtrl,
} = require("../../controllers/authCtrl");
const {
  registerValidator,
  loginValidator,
  userUpdateValidator,
} = require("../../middlewares/joi");
const auth = require("../../middlewares/auth");
const multerUploadMiddleware = require("../../middlewares/multerUploadMiddleware");

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
router.patch(
  "/avatars",
  auth,
  multerUploadMiddleware.single("avatar"),
  catchAsync(updateAvatarCtrl)
);

module.exports = router;
