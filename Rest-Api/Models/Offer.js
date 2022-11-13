const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required!"],
      minLength: [6, "Title should be at least 6 characters!"],
      maxLength: [35, "Title should be max 6 characters!"],
    },
    town: {
      type: String,
      trim: true,
      required: [true, "Town is required!"],
    },
    country: {
      type: String,
      trim: true,
      required: [true, "Country is required!"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Offer description is required!"],
      minLength: [20, "Offer description should be at least 20 characters!"],
    },
    pricePerPerson: {
      type: Number,
      trim: true,
      required: [true, "Price per person is required!"],
    },
    images: {
      type: String,
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
    peopleBooked: {
      type: Number,
      default: 0,
    },
    agencyId: {
      type: mongoose.Types.ObjectId,
      ref: "Agency",
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
