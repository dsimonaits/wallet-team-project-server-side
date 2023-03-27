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
  signUpVerificationCtrl,
  resendVerificationCtrl,
} = require("../../controllers/authCtrl");
const {
  registerValidator,
  loginValidator,
  userUpdateValidator,
  resendVerificationValidator,
} = require("../../middlewares/joi");
const auth = require("../../middlewares/auth");
const multerUploadMiddleware = require("../../middlewares/multerUploadMiddleware");

router.post("/signup", registerValidator, catchAsync(signUpCtrl));
router.get("/verify/:verificationToken", catchAsync(signUpVerificationCtrl));
router.post(
  "/verify",
  resendVerificationValidator,
  catchAsync(resendVerificationCtrl)
);
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
