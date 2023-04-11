const express = require("express");
const { catchAsync } = require("../../helpers/errors");
// const { authMiddleware } = require("../../middlewares");
const router = express.Router();
const currenciesApiCtrl = require("../../controllers/currenciesApi/currenciesApiCtrl");

// router.use(authMiddleware);

router.get("/", currenciesApiCtrl);


module.exports = router;
