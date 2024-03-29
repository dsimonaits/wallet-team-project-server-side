const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require("cookie-parser");
const swaggerDocument = require("./swagger.json");
const HttpException = require("./utils/HttpException.utils");

require("./config/config-passport");
require("dotenv").config();

const {
  transactionRouter,
  currenciesRouter,
  authRouter,
} = require("./routes/api");
const { checkConnection } = require("./models/connectionMongoDb");
const errorHandler = require("./helpers/errors/errorHandler");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const allowedOrigins = ["http://localhost:3000", process.env.CLIENT_URL];

app.use(checkConnection);
app.use(logger(formatsLogger));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/user", authRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/currenciesApi", currenciesRouter);

app.all("*", (req, res, next) => {
  const err = new HttpException(404, "Endpoint Not Found");
  next(err);
});
app.use(errorHandler);
module.exports = app;
