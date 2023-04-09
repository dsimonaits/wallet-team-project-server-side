const express = require("express");
const router = express.Router();
const { catchAsync } = require("../../helpers/errors");
const {
  signupController,
  usersController,
  refreshTokenController,
  loginController,
  logoutController,
} = require("../../controllers/auth/index");

const auth = require("../../middlewares/authMiddlewares");

router.post("/signup", catchAsync(signupController));
router.post("/login", catchAsync(loginController));
router.get("/logout", auth, catchAsync(logoutController));
// router.get('/users/current',currentUser )
// router.get('/activate/:link', activate)
// router.get("/:id", catchAsync(getUserById));
router.get("/refresh", refreshTokenController);
router.get("/users", catchAsync(usersController));

module.exports = router;
