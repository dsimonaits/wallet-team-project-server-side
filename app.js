const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { transactionRouter } = require("./routes/api");
const authRouter = require("./routes/api/auth");
const { checkConnection } = require("./models/connectionMongoDb");
const errorHandler = require("./helpers/errors/errorHandler");
const test = require("./routes/api/test");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const cookieParser = require("cookie-parser");

app.use(checkConnection);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", authRouter);
app.use("/api/test", test);
app.use("/api/transaction", transactionRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use(errorHandler);

module.exports = app;
