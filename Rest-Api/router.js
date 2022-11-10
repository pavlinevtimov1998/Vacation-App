const router = require("express").Router();

const authController = require("./Controllers/authController");
const offerController = require("./Controllers/offerController");
const { globalErrorHandler } = require("./Middlewares/globallErrHandler");

router.use("/auth", authController);
router.use("/data", offerController);

router.use(globalErrorHandler);

module.exports = router;
