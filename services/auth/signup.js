const UserSchema = require("../../models/userSchema");
const { Conflict } = require("../../helpers/errors/authErrors");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
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
  // const token= await jwt.sign({ id, name}, process.env.SECRET,{expiresIn:'1h'})
  const token = await jwt.sign(
    { id: id, createdAt: newUser.createdAt },
    process.env.SECRET,
    { expiresIn: "1h" }
  );

  console.log("token", token);
  const refreshToken = jwt.sign(
    { id: id, createdAt: newUser.createdAt },
    process.env.REFRESH_SECRET,
    { expiresIn: "30d" }
  );
  console.log("refreshToken", refreshToken);

  newUser.token = token;
newUser.refreshToken= refreshToken;
newUser.isActivated=true;
  await newUser.save();
  console.log('newUser',newUser)
  // await token.save()
//   const tokenUser= new UserSchema({
//       name,
//   email,
//   password:hashPassword,
//       token,
//       refreshToken,
//   })
//   await tokenUser.save()
//   console.log('tokenUser',tokenUser)
  // return token
  //

  // const token= await jwt.sign({id, name}, process.env.SECRET,{expiresIn:'1h'})

  // name,
  // email,
  // password:hashPassword,
  // token:token
};
module.exports = signup;
