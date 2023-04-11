const { responseOk } = require("../../helpers/responses");
const currentUsers = require("../../services/auth/currentUser");

const currentController = async (req, res, next) => {
  const { _id } = req.user;

  const users = await currentUsers(_id);

  res.json(responseOk("Success", 201, "Current user", users));
};
module.exports = currentController;
