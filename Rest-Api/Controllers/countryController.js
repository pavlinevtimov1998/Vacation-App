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

    const [country, offersCount] = await countryService.getCountry(countryId);

    res.status(200).json({ country, offersCount });
  })
);

countryController.get(
  "/offers/:countryId",
  catchAsyncError(async (req, res) => {
    const countryId = req.params.countryId;
    const { skip, limit } = req.query;

    const countryOffers = await countryService.getCountryOffers(
      countryId,
      skip,
      limit
    );

    res.status(200).json(countryOffers);
  })
);

module.exports = countryController;
