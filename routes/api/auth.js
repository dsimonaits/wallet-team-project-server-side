const express = require("express");
const router = express.Router();
const { catchAsync } = require("../../helpers/errors");

const {
  signupController,
  refreshTokenController,
  loginController,
  logoutController,
  googleAuth,
  googleRedirect,
  currentUserController,
} = require("../../controllers/auth/index");

const { validateAuth } = require("../../helpers/validation");
const auth = require("../../middlewares/authMiddleware");

router.post("/signup", catchAsync(signupController));
router.post("/login", validateAuth, catchAsync(loginController));
router.post("/logout", auth, catchAsync(logoutController));
router.get("/current", auth, catchAsync(currentUserController));
// router.get('/activate/:link', activate)
router.get("/refresh", auth, catchAsync(refreshTokenController));
router.get("/google", catchAsync(googleAuth));
router.get("/google-redirect", catchAsync(googleRedirect));

module.exports = router;
