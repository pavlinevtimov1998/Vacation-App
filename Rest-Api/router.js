const router = require("express").Router();

const authController = require("./Controllers/authController");
const countryController = require("./Controllers/countryController");
const offerController = require("./Controllers/offerController");
const welcomeController = require("./Controllers/welcomeController");
const { globalErrorHandler } = require("./Middlewares/globallErrHandler");

router.use("/", welcomeController);
router.use("/auth", authController);
router.use("/countries", countryController);
router.use("/offers", offerController);

router.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found!" });
});

router.use(globalErrorHandler);

module.exports = router;
