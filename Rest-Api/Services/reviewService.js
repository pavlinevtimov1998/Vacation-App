const Review = require("../Models/Review");

const getOfferReviews = (offerId) =>
  Review.find({ offer: offerId }).populate({
    path: "user",
    select: "-password -createdAt -updatedAt -__v -bookedOffers",
  });

const addReview = (body) => Review.create(body);

module.exports = {
  getOfferReviews,
  addReview,
};
