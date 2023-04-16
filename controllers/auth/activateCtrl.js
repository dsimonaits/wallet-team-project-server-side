const activateServices = require("../../services/auth/activateServices");

const activateCtrl = async (req, res, next) => {
  const activationLink = req.params.link;
  await activateServices(activationLink);
  return res.redirect(process.env.FRONTEND_URL);
};

module.exports = activateCtrl;
