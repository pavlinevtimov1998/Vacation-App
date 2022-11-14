const router = require("express").Router();

const authController = require("./Controllers/authController");
const offerController = require("./Controllers/offerController");
const welcomeController = require("./Controllers/welcomeController");
const { globalErrorHandler } = require("./Middlewares/globallErrHandler");

router.use("/", welcomeController);
router.use("/auth", authController);
router.use("/data", offerController);

router.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found!" });
});

router.use(globalErrorHandler);

module.exports = router;
