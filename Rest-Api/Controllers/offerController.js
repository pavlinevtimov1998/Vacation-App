const offerController = require("express").Router();

const { isAgency } = require("../Middlewares/guards");
const offerService = require("../Services/offerService");
const { catchAsyncError } = require("../Util/errorParser");
const { upload } = require("../Util/imageUpload");

offerController.get(
  "/",
  catchAsyncError(async (req, res) => {
    const offers = await offerService.getOffers();

    res.status(200).json(offers);
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
    body.agencyId = req.agency._id;

    const offer = await offerService.createOffer(body, req.files);

    res.status(201).json(offer);
  })
);

module.exports = offerController;
