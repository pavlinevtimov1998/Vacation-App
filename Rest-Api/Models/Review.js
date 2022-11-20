const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt" },
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
