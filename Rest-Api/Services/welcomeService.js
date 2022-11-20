const Country = require("../Models/Country");
const Offer = require("../Models/Offer");

const topOffers = () =>
  Offer.find()
    .sort({ rating: -1 })
    .limit(5)
    .select(
      "-town -country -description -ratingsQuantity -updatedAt -createdAt -__v"
    )
    .populate("agency", "-password -email -updatedAt -createdAt -__v");

const TopCountries = () => Country.find().sort({ rating: -1 }).limit(3);

module.exports = {
  topOffers,
  TopCountries,
};
