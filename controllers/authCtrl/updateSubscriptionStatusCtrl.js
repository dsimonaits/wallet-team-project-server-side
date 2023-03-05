const { updateSubscriptionStatus } = require("../../services/authServices");
const { WrongParametersError } = require("../../helpers/errors");
const { responseOk } = require("../../helpers/responses");

const updateSubscriptionStatusCtrl = async (req, res) => {
  const { _id: userId } = req.user;
  const { subscription } = req.body;

  if (!subscription) {
    throw new WrongParametersError("Missing field subscription!");
  }

  const updatedContact = await updateSubscriptionStatus(userId, subscription);

  return res.json(
    responseOk(
      "success",
      201,
      "Contact status updated successfully",
      updatedContact
    )
  );
};

module.exports = updateSubscriptionStatusCtrl;
