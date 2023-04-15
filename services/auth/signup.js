const UserSchema = require("../../models/userSchema");
const { Conflict } = require("../../helpers/errors/authErrors");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { userDto } = require("../../helpers/dtos");
require("dotenv").config();

const sendActivationMail = require("./mailServices");
const { tokenService, saveToken } = require("./tokenService");

const signup = async (email, password, name) => {
  const candidate = await UserSchema.findOne({ email });

  if (candidate) {
    throw new Conflict(`${candidate.email} was registered before`);
  }
  const activationLink = uuidv4();
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await UserSchema.create({
    name,
    email,
    password: hashPassword,
    activationLink,
  });

  await sendActivationMail(
    email,
    `${process.env.BASE_URL}/api/user/activate/${activationLink}`
  );
  const newUserDto = userDto(newUser);

  const tokens = await tokenService(newUserDto);
  await saveToken(newUserDto._id, tokens.refreshToken);

  return { ...tokens, ...newUserDto };
};

module.exports = signup;
