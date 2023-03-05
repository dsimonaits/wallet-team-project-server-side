const { current } = require("../../services/authServices");
const { responseOk } = require("../../helpers/responses");

const currentCtrl = async (req, res) => {
  const { _id: id } = req.user;

  const user = await current(id);

  res.json(responseOk("Success", 200, "Contact found successfully", user));
};

module.exports = currentCtrl;
