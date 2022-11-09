const authController = require("express").Router();

const authService = require("../Services/userService");
const { catchAsyncError } = require("../Util/errorParser");
const { isGuest, isUser } = require("../Middlewares/guards");

authController.post(
  "/register",
  isGuest(),
  catchAsyncError(async (req, res) => {
    const [token, user] = await authService.register(req.body);

    res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

    res.status(200).json({
      _id: user._id,
      username: user.username,
    });
  })
);

authController.post("/login", isGuest(), async (req, res) => {
  const [token, user] = await authService.login(req.body);

  res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

  res.status(200).json({
    _id: user._id,
    username: user.username,
  });
});

authController.get("/logout", isUser(), (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).json({ message: "Successfull logout!" });
});

module.exports = authController;
