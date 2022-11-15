const countryController = require("express").Router();

const countryService = require("../Services/countryService");
const { catchAsyncError } = require("../Util/errorParser");

countryController.get(
  "/",
  catchAsyncError(async (req, res) => {
    const countries = await countryService.getAll();

    res.status(200).json(countries);
  })
);

countryController.get(
  "/:countryId/offers",
  catchAsyncError(async (req, res) => {
    const countryId = req.countryId;

    const countryOffers = await countryService.getCountryOffers(countryId);

    res.status(200).json(countryOffers);
  })
);

module.exports = countryController;
