const router = require("express").Router();

const userController = require("./Controllers/userController");
const businessController = require("./Controllers/businessController");

router.use("/users", userController);
router.use("/business", businessController);

module.exports = router;
