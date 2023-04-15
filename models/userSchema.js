const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    index: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt, bcrypt.genSaltSync(6));
};
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const UserSchema = mongoose.model("User", userSchema);
module.exports = UserSchema;
