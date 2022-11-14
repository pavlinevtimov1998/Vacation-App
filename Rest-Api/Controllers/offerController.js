const offerController = require("express").Router();

const { isAgency } = require("../Middlewares/guards");
const offerService = require("../Services/offerService");
const { catchAsyncError } = require("../Util/errorParser");
const { upload } = require("../Util/imageUpload");

offerController.post(
  "/offers",
  isAgency(),
  upload.array("images"),
  catchAsyncError(async (req, res) => {
    const body = req.body;
    body.agencyId = req.agency._id;

    const offer = await offerService.createOffer(body, req.files);

    res.status(201).json(offer);
  })
);

module.exports = offerController;
