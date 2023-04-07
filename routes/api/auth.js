const express=require('express');
const router = express.Router();
const { catchAsync } = require("../../helpers/errors");
const{signupController,usersController,refreshTokenController}=require('../../controllers/auth/index')


router.post('/signup', catchAsync(signupController));
// router.post('/login', login)
// router.post('/logout',authenticate, logout )

// router.get('/activate/:link', activate)
 router.get('/refresh', refreshTokenController)
 router.get('/users', catchAsync(usersController))




module.exports = router;
