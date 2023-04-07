const UserSchema=require('../../../models/userSchema')
const{Conflict}=require('../../../helpers/errors/authErrors')
const bcrypt= require('bcryptjs')
const { v4: uuidv4 } = require('uuid');

const signup= async(email,password, name)=>{

const user= UserSchema.findOne({email})
if(!user){
    throw new Conflict(`${email} was registered before`)
}
const hashPassword= await bcrypt.hash(password,10)
// const activationLink= uuidv4();
const newUser = new UserSchema({
name,
email,
password:hashPassword,
})
await newUser.save()

}
module.exports=signup;