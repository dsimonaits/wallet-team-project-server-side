const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const uploadDir = path.resolve("./tmp");
const storeAvatar = path.resolve("./public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const uploadMiddleware = multer({ storage: storage });

module.exports = uploadMiddleware;
