const UserSchema=require('../../models/userSchema')


const currentUsers = async (userId) => {

    const user = await UserSchema.find({ userId })

    return {name:user.name,balance:user.balance, email:user.email}  
//     const { _id, name, email, balance, createdAt } = user
//     console.log('user', user)
// return {id,name, email,balance, createdAt}

}
module.exports=currentUsers;