const profileController = require("express").Router();

const profileService = require("../Services/profileService");
const { isAccount } = require("../Middlewares/guards");
const { catchAsyncError } = require("../Util/errorParser");

profileController.get(
  "/accountId",
  isAccount(),
  catchAsyncError(async (req, res) => {
    const [account, isAgency] = await profileController.getAccountData(
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

module.exports = profileController;
