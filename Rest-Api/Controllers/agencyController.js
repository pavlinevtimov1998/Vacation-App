const agencyController = require("express").Router();

const agencyService = require("../Services/agencyService");
const { isGuest, isAgency } = require("../Middlewares/guards");
const { catchAsyncError } = require("../Util/errorParser");
const Agency = require("../Models/Agency");

agencyController.post(
  "/register",
  isGuest(),
  catchAsyncError(async (req, res) => {
    const [token, agency] = await agencyService.agencyRegister(req.body);

    res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });

    res.status(201).json({
      _id: agency._id,
      email: agency.email,
      agencyName: agency.agencyName,
      isAgency: true,
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
      isAgency: true,
    });
  })
);

agencyController.post("/logout", isAgency(), (req, res) => {
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

agencyController.get(
  "/email",
  catchAsyncError(async (req, res) => {
    const { email } = req.query;

    const isExisting = !!(await agencyService.findExistingEmail(email));

    res.status(200).json(isExisting);
  })
);

agencyController.get(
  "/agencyName",
  catchAsyncError(async (req, res) => {
    const { agencyName } = req.query;

    const isExisting = !!(await agencyService.findExistingAgencyName(
      agencyName
    ));

    res.status(200).json(isExisting);
  })
);

module.exports = agencyController;
