const offerController = require("express").Router();

const offerService = require("../Services/offerService");
const { isAgency, isUser } = require("../Middlewares/guards");
const { catchAsyncError } = require("../Util/errorParser");
const { upload } = require("../Util/imageUpload");

offerController.get(
  "/",
  catchAsyncError(async (req, res) => {
    const { skip, limit, search } = req.query;

    const [offers, offersCount] = await offerService.getOffers(
      skip,
      limit,
      search
    );

    res.status(200).json({ offers, offersCount });
  })
);

offerController.post(
  "/",
  isAgency(),
  upload.array("images"),
  catchAsyncError(async (req, res) => {
    if (req.files.length == 0) {
      throw {
        message: "Images are required!",
        status: 400,
      };
    }

    const body = req.body;
    body.agency = req.agency._id;

    const [offer, _] = await offerService.createOffer(body, req.files);

    res.status(201).json(offer);
  })
);

offerController.get(
  "/:offerId",
  catchAsyncError(async (req, res) => {
    const offerId = req.params.offerId;

    const offer = await offerService.getOne(offerId);

    res.status(200).json(offer);
  })
);

offerController.delete(
  "/:offerId",
  isAgency(),
  catchAsyncError(async (req, res) => {
    const agencyId = req.agency._id;
    const offerId = req.params.offerId;

    await offerService.deleteOffer(agencyId, offerId);

    res.status(204).json({ message: "Successfully deleted offer!" });
  })
);

offerController.post(
  "/booking/:offerId",
  isUser(),
  catchAsyncError(async (req, res) => {
    const body = req.body;
    body.offer = req.params.offerId;
    body.user = req.user._id;

    const bookingData = await offerService.booking(body);

    res.json(bookingData);
  })
);

offerController.delete(
  "/cancel-booking/:offerId",
  isUser(),
  catchAsyncError(async (req, res) => {
    const offerId = req.params.offerId;
    const userId = req.user._id;

    const result = await offerService.cancelBooking(offerId, userId);
    console.log(result);
    res.status(204).json();
  })
);

module.exports = offerController;
