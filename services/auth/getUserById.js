const UserSchema = require("../../models/userSchema");
const { NotFound } = require("../../helpers/errors/requestErrors");

const getUserById = async (id) => {
  const user = await UserSchema.findOne({ id });

  if (!user) {
    throw new NotFound(`Not found task id: ${id}`);
  }
  return user;
};

module.exports = getUserById;
