const UserSchema = require("../../models/userSchema");
const { Conflict } = require("../../helpers/errors/authErrors");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const TokenSchema = require('../../models/tokenSchema')
const jwt = require("jsonwebtoken");

const signup = async (email, password, name) => {
  const user = await UserSchema.findOne({ email, isActivated: true });
  //  console.log('user',user)
  if (user) {
    throw new Conflict(`${user.email} was registered before`);
  }

  // const token = await jwt.sign( {id:user.id,createdAt:user.createdAt} , process.env.SECRET, { expiresIn: "1h" });

  //
  const activationLink = uuidv4();
  console.log("activationLink", activationLink);
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new UserSchema({
    name,
    email,
    password: hashPassword,
  });
//   console.log("newUser", newUser);

  // await user.save()

  const { _id: id } = await newUser.save();
  
  const token = await jwt.sign(
    { id: id, createdAt: newUser.createdAt },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    { id: id, createdAt: newUser.createdAt },
    process.env.REFRESH_SECRET,
    { expiresIn: "30d" }
  );

newUser.token = token;
newUser.isActivated=true;
newUser.refreshToken = refreshToken; 
  await newUser.save();
   console.log('newUser',newUser)

//   const { _id: id } = await newUser.save();
//   console.log('user',user)

//   const tokenData =await UserSchema.findOne({user:id})
//   if(tokenData){
   
// };  


//   await new UserSchema({ user: user.id, token: refreshToken }).save();
// console.log('tokenData',tokenData)
console.log('TokenSchema', TokenSchema)
};



module.exports = signup;
