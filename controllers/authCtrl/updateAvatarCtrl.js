const { updateAvatar } = require("../../services/authServices");
const { WrongParametersError } = require("../../helpers/errors");
const { responseOk } = require("../../helpers/responses");

const updateAvatarCtrl = async (req, res) => {
  const { _id: userId } = req.user;
  const { fieldname } = req.body;

  console.log(req.file);

  if (!fieldname !== "avatar") {
    throw new WrongParametersError("Missing field avatar!");
  }

  // const updatedContact = await updateAvatar(userId, avatar);

  return res.json(responseOk("success", 201, "Avatar updated successfully"));
};

module.exports = updateAvatarCtrl;
