const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const { transactionRouter } = require("./routes/api");
const authRouter = require("./routes/api/auth");
const currenciesApi = require("./routes/api/currenciesApiRouter");
const { checkConnection } = require("./models/connectionMongoDb");
const errorHandler = require("./helpers/errors/errorHandler");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(checkConnection);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

require("./config/config-passport");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/user", authRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/currenciesApi", currenciesApi);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use(errorHandler);

module.exports = app;
