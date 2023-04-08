const UserSchema=require('../../models/userSchema')
const{Conflict}=require('../../helpers/errors/authErrors')
const bcrypt= require('bcryptjs')
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();
const jwt = require('jsonwebtoken')

const signup= async(email,password, name)=>{

const user= await UserSchema.findOne({email})
//  console.log('user',user)
if(user){
    throw new Conflict(`${user.email} was registered before`)
}
const hashPassword= await bcrypt.hash(password,10)
 const activationLink= uuidv4();
 console.log('activationLink',activationLink)
const newUser = new UserSchema({
name,
email,
password:hashPassword,
})

const {_id:id}= await newUser.save()

const token= await jwt.sign({id, name}, process.env.SECRET,{expiresIn:'1h'})
console.log('token', token)
}
module.exports=signup;