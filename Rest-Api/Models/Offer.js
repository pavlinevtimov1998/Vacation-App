const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    town: {
      type: String,
    },
    country: {
      type: String,
    },
    description: {
      type: String,
    },
    pricePerPerson: {
      type: Number,
    },
    imageCover: {
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
