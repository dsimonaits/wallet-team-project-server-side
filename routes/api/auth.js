const express = require("express");
const router = express.Router();
const { catchAsync } = require("../../helpers/errors");
const {
  signupController,
  usersController,
  refreshTokenController,
  loginController,
  logoutController,
  getUserById,
  currentUserController,
} = require("../../controllers/auth/index");

// const auth = require("../../middlewares/authMiddlewares");
const auth = require('../../middlewares/authMiddleware')


router.post('/signup', catchAsync(signupController));
router.post('/login', catchAsync(loginController))
router.post('/logout',auth,catchAsync( logoutController) )
router.get('/current', auth, catchAsync(currentUserController ))
// router.get('/activate/:link', activate)
router.get('/:id',auth, catchAsync(getUserById))
router.get('/refresh',auth, catchAsync(refreshTokenController))
router.get('/users', auth,catchAsync(usersController))


module.exports = router;
