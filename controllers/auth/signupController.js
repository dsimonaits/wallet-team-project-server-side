const signup=require('../../services/testMessage/auth/signup')
const { responseOk } = require("../../helpers/responses");
const signupController=async(req, res, next)=>{
const {email, password, name}=req.body
  const user = await signup(email, password,name);
  res.json(responseOk("Success", 201, "new user created", user));
  
  console.log('req.body',req.body)
  if(email){
    return   res.status(409).json({
    status: "Cconflict",
    code: 201,
    message: `${email} was registrate`
  });
  }


}
module.exports= signupController