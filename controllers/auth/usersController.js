const { responseOk } = require("../../helpers/responses");
const allUsers=require('../../services/auth/users')

const usersController=async(req, res, next)=>{

 const users = await allUsers()
 console.log('users',users)
  res.json(responseOk("Success", 201, "Text message created", users));

}
module.exports=usersController