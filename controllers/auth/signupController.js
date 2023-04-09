const signup=require('../../services/auth/signup')
const { responseOk } = require("../../helpers/responses");


const signupController=async(req, res, next)=>{
const {email, password, name}=req.body
// console.log('req.body',req.body)

  const user = await signup(email, password,name);
  res.json(responseOk("Success", 201, "new user created", user));
  // console.log('req.body',req.body)

}
module.exports= signupController