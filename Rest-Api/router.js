const router = require("express").Router();

const userController = require("./Controllers/userController");
const agencyController = require("./Controllers/agencyController");
const offerController = require("./Controllers/offerController");

router.use("/auth/user", userController);
router.use("/auth/agency", agencyController);
router.use("/data", offerController);

module.exports = router;
