const Users = require("../../models/userModel");
const { NotFound } = require("../../helpers/errors");

const updateAvatar = async (id, avatar) => {
  const updatedContact = await Users.findByIdAndUpdate(
    { _id: id },
    { avatarURL: avatar },
    {
      new: true,
    }
  ).select({ avatarURL: 1, _id: 0 });

  if (!updatedContact) {
    throw new NotFound("Not found");
  }

  return updatedContact;
};

module.exports = updateAvatar;
