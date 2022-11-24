const profileController = require("express").Router();

const profileService = require("../Services/profileService");
const { isAccount, isUser } = require("../Middlewares/guards");
const { catchAsyncError } = require("../Util/errorParser");

profileController.get(
  "/",
  isAccount(),
  catchAsyncError(async (req, res) => {
    const { agency, user } = req;

    const account = await profileService.getAccountData(agency, user);

    res.status(200).json(account);
  })
);

profileController.get(
  "/user",
  isUser(),
  catchAsyncError(async (req, res) => {
    const userId = req.user._id;

    const [profileData, bookings] = await profileService.getUserProfile(userId);

    res.status(200).json({ profileData, bookings });
  })
);

module.exports = profileController;
