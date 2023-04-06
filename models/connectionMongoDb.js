const mongoose = require("mongoose");
require("dotenv").config();

const host =
  "mongodb+srv://wallet-team:uury3qBRwBUYVHNn@cluster0.decnx92.mongodb.net/db-wallet?retryWrites=true&w=majority";

const mongooseConnect = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(typeof process.env.DB_HOST);
};

const checkConnection = (req, res, next) => {
  const response = {
    status: "Internal Server Error",
    code: 503,
    message: "DB is offline",
    data: null,
  };
  if (mongoose.connection.readyState === 0) {
    return res.status(503).json(response);
  }
  next();
};

module.exports = { mongooseConnect, checkConnection };
