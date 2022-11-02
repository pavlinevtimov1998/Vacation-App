const router = require("express").Router();

const authController = require("./Controllers/authController");

router.use("/auth", authController);

module.exports = router;
