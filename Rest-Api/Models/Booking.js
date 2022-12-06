const mongoose = require("mongoose");

const Offer = require("./Offer");

const bookingSchema = new mongoose.Schema(
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

bookingSchema.post("save", async function () {
  await Offer.findByIdAndUpdate(this.offer, {
    $push: { peopleBooked: this.user },
  });
});

bookingSchema.post("deleteOne", async function () {
  await Offer.findByIdAndUpdate(this.offer, {
    $pull: { peopleBooked: this.user },
  });
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
