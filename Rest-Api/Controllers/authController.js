const authController = require("express").Router();

const authService = require("../Services/authService");

const { catchAsyncError } = require("../Util/errorParser");
const { isGuest, isUser } = require("../Middlewares/guards");

authController.post(
  "/register",
  isGuest(),
  catchAsyncError(async (req, res) => {
    const body = req.body;

    const [token, user] = await authService.register(body);

    res.cookie(COOKIE_NAME, token, { httpOnly: true });
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  })
);

authController.post("/login", isGuest(), async (req, res) => {
  const body = req.body;

  const [token, user] = await authService.login(body);

  res.cookie(COOKIE_NAME, token, { httpOnly: true });

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

authController.get("/logout", isUser(), (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).json({ message: "Successfull logout!" });
});

module.exports = authController;
