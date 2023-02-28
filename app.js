const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use(errorHandler);

module.exports = app;
