const UserSchema = require("../../models/userSchema");

const transactionCountBalance = async (type, sum, _id) => {
  const user = await UserSchema.findById({ _id });
  let balance = user.balance;
  if (type) {
    balance += sum;
  } else {
    balance -= sum;
  }
  await UserSchema.findByIdAndUpdate(_id, { balance });
};

module.exports = { transactionCountBalance };
