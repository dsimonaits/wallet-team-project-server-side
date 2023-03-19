const { updateAvatar } = require("../../services/authServices");
const { WrongParametersError } = require("../../helpers/errors");
const { responseOk } = require("../../helpers/responses");

const updateAvatarCtrl = async (req, res) => {
  const { _id: userId } = req.user;

  if (req.file === undefined) {
    throw new WrongParametersError("Missing file!");
  }

  const { fieldname, path, originalname } = req.file;

  if (fieldname !== "avatar") {
    throw new WrongParametersError("Missing field avatar!");
  }

  await updateAvatar(userId, path, originalname);

  return res.json(responseOk("success", 201, "Avatar updated successfully"));
};

module.exports = updateAvatarCtrl;
