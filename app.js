const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require("cookie-parser");
const swaggerDocument = require("./swagger.json");
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

const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL,
  "https://dsimonaits.github.io",
];

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

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.use(errorHandler);

module.exports = app;
