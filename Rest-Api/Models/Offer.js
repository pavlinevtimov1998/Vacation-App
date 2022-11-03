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
    price: {
      type: Number,
    },
    imageCover: {
      type: String,
    },
    program: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Program",
        default: [],
      },
    ],
    companyId: {
      type: mongoose.Types.ObjectId,
      ref: "Business",
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
