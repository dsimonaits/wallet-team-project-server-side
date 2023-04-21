const getUserById = require("../../services/auth/getUserById");
const { responseOk } = require("../../helpers/responses");

const getUserByIdController = async (req, res, next) => {
  const { id } = req.params;
  const user = getUserById(id);

  res.json(responseOk("Success", 201, `User ${id} fined`, user));
};
module.exports = getUserByIdController;
