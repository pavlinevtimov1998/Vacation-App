const userController = require("express").Router();

const userService = require("../Services/userService");

const { catchAsyncError } = require("../Util/errorParser");
const { isGuest, isUser } = require("../Middlewares/guards");

userController.post(
  "/register",
  isGuest(),
  catchAsyncError(async (req, res) => {
    const body = req.body;

    const [token, user] = await userService.register(body);

    res.cookie(COOKIE_NAME, token, { httpOnly: true });
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  })
);

userController.post("/login", isGuest(), async (req, res) => {
  const body = req.body;

  const [token, user] = await userService.login(body);

  res.cookie(COOKIE_NAME, token, { httpOnly: true });

  res.cookie(COOKIE_NAME, token, { httpOnly: true });
  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

userController.get("/logout", isUser(), (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).json({ message: "Successfull logout!" });
});

module.exports = userController;
