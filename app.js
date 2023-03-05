const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { checkConnection } = require("./models/connectionMongoDb");
const auth = require("./middlewares/auth");
const contactsRouter = require("./routes/api/contactsRouter");
const authRouter = require("./routes/api/authRouter");
require("./config/config-passport");
const errorHandler = require("./helpers/errors/errorHandler");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(checkConnection);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", authRouter);
app.use("/api/contacts", auth, contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use(errorHandler);

module.exports = app;
