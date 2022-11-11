const authController = require("express").Router();

const authService = require("../Services/authService");
const { catchAsyncError } = require("../Util/errorParser");
const { isGuest, canLogout, isAccount } = require("../Middlewares/guards");

authController.post(
  "/user/register",
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

authController.post("/user/login", isGuest(), async (req, res) => {
  console.log(req.body);
  const [token, user] = await authService.login(req.body);

  res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

  res.status(200).json({
    _id: user._id,
    username: user.username,
  });
});

authController.post(
  "/agency/register",
  isGuest(),
  catchAsyncError(async (req, res) => {
    const [token, agency] = await authService.agencyRegister(req.body);

    res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

    res.status(200).json({
      _id: agency._id,
      email: agency.email,
      agencyName: agency.agencyName,
    });
  })
);

authController.post("/agency/login", isGuest(), async (req, res) => {
  const [token, agency] = await authService.agencyLogin(req.body);

  res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

  res.status(200).json({
    _id: agency._id,
    email: agency.email,
    agencyName: agency.agencyName,
  });
});

authController.get(
  "/profile",
  isAccount(),
  catchAsyncError(async (req, res) => {
    const [account, isAgency] = await authService.getAccountData(
      req.agency,
      req.user
    );

    isAgency
      ? res.status(200).json({
          _id: account._id,
          email: account.email,
          agencyName: account.agencyName,
        })
      : res.status(200).json({
          _id: account._id,
          username: account.username,
        });
  })
);

authController.get("/logout", canLogout(), (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).json({ message: "Successfull logout!" });
});

module.exports = authController;
