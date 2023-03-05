const app = require("./app");
const { mongooseConnect } = require("./models/connectionMongoDb");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(PORT, async () => {
      await mongooseConnect()
        .then(() => {
          console.log("Database connection successful");
        })
        .catch((e) => {
          console.log("Database connection failed with error: " + e.message);
        });
    });
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
    process.exit(1);
  }
};

start();
