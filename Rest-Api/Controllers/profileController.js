const profileController = require("express").Router();

const profileService = require("../Services/profileService");
const { isAccount, isUser, isAgency } = require("../Middlewares/guards");
const { catchAsyncError } = require("../Util/errorParser");
const { upload } = require("../Util/imageUpload");

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
    const { skip, limit } = req.query;

    const [profileData, bookings, bookingsCount] =
      await profileService.getUserProfile(userId, skip, limit);

    res.status(200).json({ profileData, bookings, bookingsCount });
  })
);

profileController.get(
  "/user-data",
  isUser(),
  catchAsyncError(async (req, res) => {
    const userId = req.user._id;

    const profileData = await profileService.getUserData(userId);

    res.status(200).json(profileData);
  })
);

profileController.patch(
  "/user/edit",
  isUser(),
  upload.array("image", 1),
  catchAsyncError(async (req, res) => {
    const userId = req.user._id;
    const body = req.body;

    const result = await profileService.editUserData(userId, body, req.files);

    if (Array.isArray(result)) {
      return res.status(201).json(result[0]);
    }

    res.status(201).json(result);
  })
);

profileController.get(
  "/agency/:agencyId",
  catchAsyncError(async (req, res) => {
    const agencyId = req.params.agencyId;

    const agencyData = await profileService.getAgencyProfile(agencyId);

    res.status(200).json(agencyData);
  })
);

profileController.patch(
  "/agency/edit",
  isAgency(),
  upload.array("image", 1),
  catchAsyncError(async (req, res) => {
    const agencyId = req.agency._id;
    const body = req.body;

    const result = await profileService.editAgencyData(
      agencyId,
      req.files,
      body
    );

    if (Array.isArray(result)) {
      return res.status(201).json({
        email: result[0].email,
        agencyName: result[0].agencyName,
        _id: result[0]._id,
        image: result[0]?.image,
        isAgency: true,
      });
    }

    res.status(201).json({
      email: result.email,
      agencyName: result.agencyName,
      _id: result._id,
      image: result?.image,
      isAgency: true,
    });
  })
);

profileController.get(
  "/agency/offers/:agencyId",
  catchAsyncError(async (req, res) => {
    const agencyId = req.params.agencyId;
    const { skip, limit } = req.query;

    const [offers, agency, offersCount] = await profileService.getAgencyOffers(
      agencyId,
      skip,
      limit
    );

    res.status(200).json({ offers, agency, offersCount });
  })
);

module.exports = profileController;
