const Offer = require("../Models/Offer");

const addToFavourites = (userId, offerId) =>
  Offer.findByIdAndUpdate(offerId, { $push: { peopleFavourite: userId } });

const removeFromFavourites = (userId, offerId) =>
  Offer.findByIdAndUpdate(offerId, { $pull: { peopleFavourite: userId } });

module.exports = {
  addToFavourites,
  removeFromFavourites,
};
