const mongoose = require("mongoose");

const bookinkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    agency: {
      type: mongoose.Types.ObjectId,
      ref: "Agency",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offer: {
      type: mongoose.Types.ObjectId,
      ref: "Offer",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

const Booking = mongoose.model("Booking", bookinkSchema);

module.exports = Booking;
