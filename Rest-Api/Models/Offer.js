const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    town: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    pricePerPerson: {
      type: Number,
      trim: true,
    },
    images: {
      type: String,
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
