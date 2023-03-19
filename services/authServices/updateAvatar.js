const Users = require("../../models/userModel");
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");
const { NotFound } = require("../../helpers/errors");
const rootPath = require("path");
const fs = require("fs").promises;
const storeAvatar = rootPath.resolve("./public/avatars/");

const updateAvatar = async (id, path, originalname) => {
  const [name, extension] = originalname.split(".");

  const avatarNewName = `${name}-${uuidv4()}.${extension}`;

  const newAvatarPath = rootPath.join(storeAvatar, avatarNewName);

  Jimp.read(path, async (err, userAvatar) => {
    if (err) throw err;
    userAvatar.resize(250, 250).quality(60).write(newAvatarPath);
    await fs.unlink(path);
  });

  const updateAvatarPath = await Users.findByIdAndUpdate(
    { _id: id },
    { avatarURL: newAvatarPath },
    {
      new: true,
    }
  );

  if (!updateAvatarPath) {
    throw new NotFound("Not found");
  }
};

module.exports = updateAvatar;
