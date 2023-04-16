const UserSchema = require("../../models/userSchema");

const transactionCountBalance = async (type, sum, _id) => {
  const user = await UserSchema.findById({ _id });
  let balance = user.balance;
  if (type) {
    balance += Number(sum);
  } else {
    balance -= Number(sum);
  }
  await UserSchema.findByIdAndUpdate(_id, { balance });
};

module.exports = { transactionCountBalance };
