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

welcomeController.get("/top-countries", (req, res) => {
  res.status(200).json(welcomeService.mockData);
});

module.exports = welcomeController;
