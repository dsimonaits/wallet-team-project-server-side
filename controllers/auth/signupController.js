const signup=require('../../services/testMessage/auth/signup')
const { responseOk } = require("../../helpers/responses");
const signupController=(req, res, next)=>{
const {email, password, name}=req.body
  const user = signup(email, password,name);
  console.log('req.body',req.body)
  res.json(responseOk("Success", 201, "Text message created", user));



}
module.exports= signupController