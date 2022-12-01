const featureController = require("express").Router();

const Feature = require("../Models/Feature");
const { isAgency } = require("../Middlewares/guards");
const { catchAsyncError } = require("../Util/errorParser");

featureController.get(
  "/",
  isAgency(),
  catchAsyncError(async (req, res) => {
    const features = await Feature.find();

    res.status(200).json(features);
  })
);

module.exports = featureController;
