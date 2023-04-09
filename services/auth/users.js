const UserSchema=require('../../models/userSchema')


const allUsers= async()=>{

const user= await UserSchema.find({})
//  console.log('user',user)

return user
}
module.exports=allUsers;