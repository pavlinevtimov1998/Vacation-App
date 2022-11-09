const router = require("express").Router();

const userController = require("./Controllers/userController");
const agencyController = require("./Controllers/agencyController");
const offerController = require("./Controllers/offerController");

router.use("/user", userController);
router.use("/agency", agencyController);

router.use("/data", offerController);

module.exports = router;
