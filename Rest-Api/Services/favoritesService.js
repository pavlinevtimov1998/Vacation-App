const Offer = require("../Models/Offer");

const addToFavorites = (userId, offerId) =>
  Offer.findByIdAndUpdate(offerId, { $push: { peopleFavorite: userId } });

const removeFromFavorites = (userId, offerId) =>
  Offer.findByIdAndUpdate(offerId, { $pull: { peopleFavorite: userId } });

module.exports = {
  addToFavorites,
  removeFromFavorites,
};
