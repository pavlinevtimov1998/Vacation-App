const agencyController = require("express").Router();

const agencyService = require("../Services/agencyService");
const { catchAsyncError } = require("../Util/errorParser");
const { isGuest, isUser } = require("../Middlewares/guards");

agencyController.post(
  "/register",
  isGuest(),
  catchAsyncError(async (req, res) => {
    const [token, agency] = await agencyService.register(req.body);

    res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

    res.status(200).json({
      _id: agency._id,
      email: agency.email,
      agencyName: agency.agencyName,
    });
  })
);

agencyController.post("/login", isGuest(), async (req, res) => {
  const [token, agency] = await agencyService.login(req.body);

  res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

  res.status(200).json({
    _id: agency._id,
    email: agency.email,
    agencyName: agency.agencyName,
  });
});

agencyController.get("/logout", isUser(), (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).json({ message: "Successfull logout!" });
});

module.exports = agencyController;
