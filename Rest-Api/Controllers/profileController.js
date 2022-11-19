const profileController = require("express").Router();

const profileService = require("../Services/profileService");
const { isAccount } = require("../Middlewares/guards");
const { catchAsyncError } = require("../Util/errorParser");

profileController.get(
  "/",
  isAccount(),
  catchAsyncError(async (req, res) => {
    const account = await profileService.getAccountData(req.agency, req.user);

    res.status(200).json(account);
  })
);

profileController.get(
  "/:profileId",
  catchAsyncError(async (req, res) => {
    const profileId = req.params.profileId;

    const account = await profileService.getProfile(profileId);

    res.status(200).json(account);
  })
);

module.exports = profileController;
