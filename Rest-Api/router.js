const router = require("express").Router();

const authController = require("./Controllers/authController");
const offerController = require("./Controllers/offerController");

router.use("/auth", authController);
router.use("/data", offerController);

module.exports = router;
