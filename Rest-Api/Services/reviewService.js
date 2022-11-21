const Review = require("../Models/Review");

const getOfferReviews = (offerId) =>
  Review.find({ offer: offerId }).populate({
    path: "user",
    select: "-password -createdAt -updatedAt -__v -bookedOffers",
  });

const addReview = async (body) => {
  const review = await Review.findOne({
    user: body.user,
    offer: body.offer,
  }).populate({
    path: "user",
    select: "-password -createdAt -updatedAt -__v",
  });

  if (review) {
    review.rating = body.rating;
    review.content = body.content;

    return review.save();
  }

  return Review.create(body).populate({
    path: "user",
    select: "-password -createdAt -updatedAt -__v",
  });
};

module.exports = {
  getOfferReviews,
  addReview,
};
