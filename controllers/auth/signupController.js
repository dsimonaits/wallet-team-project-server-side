const signup=require('../../services/auth/signup')
const { responseOk } = require("../../helpers/responses");
const signupValidation =require('../../helpers/validation/signupValidation')

const signupController=async(req, res, next)=>{
const {email, password, name}=req.body

const{error}=signupValidation.validate(req.body)
if (error){
  return res.send(error.details)
}
  const user = await signup(email, password,name);
    res.json(responseOk("Created", 201, "new user created", user));


}
module.exports= signupController