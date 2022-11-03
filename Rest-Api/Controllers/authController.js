const authController = require("express").Router();

const authService = require("../Services/authService");

const { catchAsyncError } = require("../Util/errorParser");
const { isGuest, isUser } = require("../Middlewares/guards");
const { getToken } = require("../util/jwtConfig");

authController.post(
  "/register",
  isGuest(),
  catchAsyncError(async (req, res) => {
    const body = req.body;

    const account = await authService.register(body);

    let token = await getToken({
      _id: account._id,
      email: account.email,
      isCompany: body.isCompany,
    });

    res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

    res.status(200).json({
      _id: account._id,
      email: account.email,
      isCompany: body.isCompany,
    });
  })
);

authController.post("/login", isGuest(), async (req, res) => {
  const body = req.body;

  const account = await authService.register(body);

  let token = await getToken({
    _id: account._id,
    email: account.email,
  });

  res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

  res.status(200).json({
    _id: account._id,
    email: account.email,
    isCompany: body.isCompany,
  });
});

authController.get("/logout", isUser(), (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).json({ message: "Successfull logout!" });
});

module.exports = authController;
