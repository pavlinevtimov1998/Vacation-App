const router = require("express").Router();

const userController = require("./Controllers/userController");
const countryController = require("./Controllers/countryController");
const offerController = require("./Controllers/offerController");
const welcomeController = require("./Controllers/welcomeController");
const agencyController = require("./Controllers/agencyController");

const { globalErrorHandler } = require("./Middlewares/globallErrHandler");

router.use("/", welcomeController);
router.use("/user", userController);
router.use("/agency", agencyController);
router.use("/countries", countryController);
router.use("/offers", offerController);

router.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found!" });
});

router.use(globalErrorHandler);

module.exports = router;
