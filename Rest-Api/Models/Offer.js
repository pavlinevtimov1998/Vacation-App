const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    imageCover: {
      type: String,
    },
    program: {
      type: mongoose.Types.ObjectId,
      ref: "Program",
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
