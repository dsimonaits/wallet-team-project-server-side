const UserSchema=require('../../../models/userSchema')
const{Conflict}=require('../../../helpers/errors/authErrors')
const bcrypt= require('bcryptjs')
const signup=(email,password, name)=>{

const user = UserSchema.findOne({email})
if(user){
    throw new Conflict(`${email} was registered before`)
}
const hashPassword= bcrypt.hash(password,10)
const newUser = new UserSchema({
name,
email,
password:hashPassword,
})
newUser.save()
}
module.exports=signup