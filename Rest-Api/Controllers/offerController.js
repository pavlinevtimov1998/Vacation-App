const offerController = require("express").Router();

const offerService = require("../Services/offerService");
const { isAgency, isUser } = require("../Middlewares/guards");
const { catchAsyncError } = require("../Util/errorParser");
const { upload } = require("../Util/imageUpload");

offerController.get(
  "/",
  catchAsyncError(async (req, res) => {
    const { skip, limit } = req.query;

    const [offers, offersCount] = await offerService.getOffers(skip, limit);

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

offerController.post(
  "/booking/:offerId",
  isUser(),
  catchAsyncError(async (req, res) => {
    const body = req.body;
    body.offer = req.params.offerId;
    body.user = req.user._id;

    console.log(body);

    const bookingData = await offerService.booking(body);

    res.json(bookingData);
  })
);

module.exports = offerController;
