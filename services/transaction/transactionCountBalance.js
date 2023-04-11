const UserSchema = require("../../models/userSchema");

const transactionCountBalance = async (type, sum, _id) => {
  const user = await UserSchema.findById({ _id });
  let balance = 0;
  if (type) {
    balance = user.balance + sum;
  } else {
    balance = user.balance - sum;
  }
  await UserSchema.findByIdAndUpdate(_id, { balance });
};

module.exports = { transactionCountBalance };
