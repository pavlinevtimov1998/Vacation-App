const router = require("express").Router();

const userController = require("./Controllers/userController");
const countryController = require("./Controllers/countryController");
const offerController = require("./Controllers/offerController");
const welcomeController = require("./Controllers/welcomeController");
const agencyController = require("./Controllers/agencyController");
const profileController = require("./Controllers/profileController");
const featureController = require("./Controllers/featureController");
const reviewController = require("./Controllers/reviewController");
const favoritesController = require("./Controllers/favoritesController");

const { globalErrorHandler } = require("./Middlewares/globallErrHandler");

router.use("/", welcomeController);
router.use("/user", userController);
router.use("/agency", agencyController);
router.use("/profile", profileController);
router.use("/countries", countryController);
router.use("/offers", offerController);
router.use("/reviews", reviewController);
router.use("/features", featureController);
router.use("/favourites", favoritesController);

router.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found!" });
});

router.use(globalErrorHandler);

module.exports = router;
