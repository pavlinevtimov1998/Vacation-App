const router = require("express").Router();

const userController = require("./Controllers/userController");

router.use("/user", userController);

module.exports = router;
