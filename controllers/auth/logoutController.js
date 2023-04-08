const UserSchema = require("../../models/userSchema");

const logoutController = async (req, res) => {
  const { _id } = req.user;

  await UserSchema.findByIdAndUpdate(_id, { token: null });

  res.json({
    message: "Logout success response",
    Status: " 204 No Content",
  });
};

module.exports = logoutController;
