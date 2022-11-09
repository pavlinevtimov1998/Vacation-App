const offerController = require("express").Router();

const { isAgency } = require("../Middlewares/guards");
const offerService = require("../Services/offerService");
const { catchAsyncError } = require("../Util/errorParser");

offerController.post(
  "/offer",
  isAgency(),
  catchAsyncError(async (req, res) => {
    const body = req.body;
    const agencyId = req.agency._id;

    const offer = await offerService.create(body, agencyId);

    res.status(201).json(offer);
  })
);

module.exports = offerController;
