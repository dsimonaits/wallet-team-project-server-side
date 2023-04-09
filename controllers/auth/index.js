const signupController = require('./signupController')
const usersController =require('./usersController')
const refreshTokenController=require('./refreshTokenController')
const getUserById = require('./getUserByIdController')



module.exports={
    signupController,
    usersController,
    refreshTokenController,
    getUserById
}