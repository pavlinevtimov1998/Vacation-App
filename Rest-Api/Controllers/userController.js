const userController = require("express").Router();

const userService = require("../Services/userService");
const { catchAsyncError } = require("../Util/errorParser");
const { isGuest, isUser } = require("../Middlewares/guards");

userController.post(
  "/register",
  isGuest(),
  catchAsyncError(async (req, res) => {
    const [token, user] = await userService.register(req.body);

    res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

    res.status(201).json({
      _id: user._id,
      username: user.username,
    });
  })
);

userController.post(
  "/login",
  isGuest(),
  catchAsyncError(async (req, res) => {
    const [token, user] = await userService.login(req.body);

    res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

    res.status(200).json({
      _id: user._id,
      username: user.username,
    });
  })
);

userController.get("/logout", isUser(), (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).json({ message: "Successfull logout!" });
});

module.exports = userController;
