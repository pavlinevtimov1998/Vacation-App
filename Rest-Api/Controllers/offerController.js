const { isBusiness } = require("../Middlewares/guards");
const offerService = require("../Services/offerService");
const { catchAsyncError } = require("../Util/errorParser");

const offerController = require("express").Router();

offerController.post(
  "/offer",
  isBusiness(),
  catchAsyncError(async (req, res) => {
    const body = req.body;
    const companyId = req.business._id;

    const created = await offerService.create(body, companyId);

    res.status(201).json(created);
  })
);

module.exports = offerController;
