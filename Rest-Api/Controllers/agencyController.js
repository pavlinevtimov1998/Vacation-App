const agencyController = require("express").Router();

const agencyService = require("../Services/agencyService");
const { isGuest, isAgency } = require("../Middlewares/guards");
const { catchAsyncError } = require("../Util/errorParser");

agencyController.post(
  "/register",
  isGuest(),
  catchAsyncError(async (req, res) => {
    const [token, agency] = await agencyService.agencyRegister(req.body);

    res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

    res.status(200).json({
      _id: agency._id,
      email: agency.email,
      agencyName: agency.agencyName,
    });
  })
);

agencyController.post(
  "/login",
  isGuest(),
  catchAsyncError(async (req, res) => {
    const [token, agency] = await agencyService.agencyLogin(req.body);

    res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

    res.status(200).json({
      _id: agency._id,
      email: agency.email,
      agencyName: agency.agencyName,
    });
  })
);

agencyController.get("/logout", isAgency(), (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).json({ message: "Successfull logout!" });
});

agencyController.get(
  "/top-agencies",
  catchAsyncError(async (req, res) => {
    const topAgencies = await agencyService.getTopAgencies();

    res.status(200).json(topAgencies);
  })
);

module.exports = agencyController;
