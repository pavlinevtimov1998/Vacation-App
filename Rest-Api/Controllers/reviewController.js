const reviewController = require("express").Router();

const reviewService = require("../Services/reviewService");

const { isUser } = require("../Middlewares/guards");
const { catchAsyncError } = require("../Util/errorParser");

reviewController.get(
  "/:offerId",
  catchAsyncError(async (req, res) => {
    const offerId = req.params.offerId;

    const reviews = await reviewService.getOfferReviews(offerId);

    res.status(200).json(reviews);
  })
);

reviewController.post(
  "/:offerId",
  isUser(),
  catchAsyncError(async (req, res) => {
    const body = req.body;
    body.offer = req.params.offerId;
    body.user = req.user._id;

    await reviewService.review(body);

    res.status(200).json({ message: "Successfull review!" });
  })
);

module.exports = reviewController;
