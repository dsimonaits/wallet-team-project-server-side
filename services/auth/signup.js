const UserSchema = require("../../models/userSchema");
const { Conflict } = require("../../helpers/errors/authErrors");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
// const TokenSchema = require('../../models/tokenSchema')
const jwt = require("jsonwebtoken");

const signup = async (email, password, name) => {
  const user = await UserSchema.findOne({ email, isActivated: true });
  //  console.log('user',user)
  if (user) {
    throw new Conflict(`${user.email} was registered before`);
  }

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
    { id:newUser.id, createdAt: newUser.createdAt },
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
   return {newUser:{name:name,token,balance:0}}
  
};



module.exports = signup;
