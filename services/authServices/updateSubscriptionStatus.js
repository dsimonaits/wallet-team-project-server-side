const Users = require("../../models/userModel");
const { NotFound } = require("../../helpers/errors");

const updateSubscriptionStatus = async (id, status) => {
  const updatedContact = await Users.findByIdAndUpdate(
    { _id: id },
    { subscription: status },
    {
      new: true,
    }
  ).select({ email: 1, subscription: 1, token: 1, _id: 0 });

  if (!updatedContact) {
    throw new NotFound("Not found");
  }

  return updatedContact;
};

module.exports = updateSubscriptionStatus;
