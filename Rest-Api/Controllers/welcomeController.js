const welcomeController = require("express").Router();

const welcomeService = require("../Services/welcomeService");
const { catchAsyncError } = require("../Util/errorParser");

welcomeController.get(
  "/",
  catchAsyncError(async (req, res) => {
    const topOffers = await welcomeService.topOffers();

    res.status(200).json(topOffers);
  })
);

welcomeController.get(
  "/top-countries",
  catchAsyncError(async (req, res) => {
    const topCountries = await welcomeService.TopCointries();

    res.status(200).json(topCountries);
  })
);

module.exports = welcomeController;
