const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const mongooseConnect = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const start = async () => {
  try {
    app.listen(PORT, async () => {
      await mongooseConnect()
        .then(async () => {
          console.log("Database connection successful");
        })
        .catch((e) => {
          console.log("Database connection failed");
          process.exit(1);
        });
    });
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
  }
};

start();
