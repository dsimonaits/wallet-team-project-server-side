const express = require("express");
const router = express.Router();
const { catchAsync } = require("../../helpers/errors");
const {
  signupController,
  usersController,
  refreshTokenController,
  loginController,
  logoutController,
  googleAuth,
  googleRedirect,
} = require("../../controllers/auth/index");

const auth = require("../../middlewares/authMiddlewares");
const { validationAuth } = require("../../helpers/validation");

router.post("/signup", catchAsync(signupController));
router.post("/login", validationAuth, catchAsync(loginController));
router.get("/logout", auth, catchAsync(logoutController));
// router.get('/users/current',currentUser )
// router.get('/activate/:link', activate)
// router.get("/:id", catchAsync(getUserById));
router.get("/refresh", refreshTokenController);
router.get("/users", catchAsync(usersController));

router.get("/google", catchAsync(googleAuth));
router.get("/google-redirect", catchAsync(googleRedirect));

module.exports = router;
