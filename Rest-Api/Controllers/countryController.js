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
  "/:countryId",
  catchAsyncError(async (req, res) => {
    const countryId = req.params.countryId;

    const country = await countryService.getCountryOffers(countryId);
    console.log(country);
    res.status(200).json(country);
  })
);

module.exports = countryController;
