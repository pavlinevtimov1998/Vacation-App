const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required!"],
      minLength: [6, "Title should be at least 6 characters!"],
      maxLength: [35, "Title should be max 35 characters!"],
    },
    town: {
      type: String,
      trim: true,
      required: [true, "Town is required!"],
    },
    country: {
      type: mongoose.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Offer description is required!"],
      minLength: [20, "Offer description should be at least 20 characters!"],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Price per person is required!"],
    },
    images: {
      type: [String],
      required: [true, "At least one image is required!"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 3.5,
      min: 1,
      max: 5,
    },
    features: [
      {
        type: String,
      },
    ],
    peopleBooked: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    agency: {
      type: mongoose.Types.ObjectId,
      ref: "Agency",
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
