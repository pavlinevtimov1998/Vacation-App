const Country = require("../Models/Country");
const Offer = require("../Models/Offer");

const topOffers = () =>
  Offer.find()
    .sort({ rating: -1 })
    .limit(5)
    .select(
      "-town -country -description -ratingsQuantity -updatedAt -createdAt -__v"
    )
    .populate("agencyId", "-password -email -updatedAt -createdAt -__v");

const TopCointries = () => Country.find();

module.exports = {
  topOffers,
  TopCointries,
};
