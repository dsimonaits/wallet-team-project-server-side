const UserSchema=require('../../models/userSchema')

const currentUser=(id)=>{
const CurrentUser=UserSchema.findOne({id})
console.log('CurrentUser',CurrentUser)
}
module.exports=currentUser