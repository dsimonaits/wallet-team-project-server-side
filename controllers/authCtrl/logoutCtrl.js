const { logout } = require("../../services/authServices");
const { responseOk } = require("../../helpers/responses");

const logoutCtrl = async (req, res) => {
  const { _id: id } = req.user;

  await logout(id);

  res.json(responseOk("No content", 204, "User successfully logged out"));
};

module.exports = logoutCtrl;
