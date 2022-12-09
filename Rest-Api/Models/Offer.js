const mongoose = require("mongoose");

const Agency = require("./Agency");
const Booking = require("./Booking");
const Review = require("./Comment");
const Country = require("./Country");

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required!"],
      minLength: [6, "Title should be at least 6 characters!"],
      maxLength: [50, "Title should be max 50 characters!"],
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
      required: [true, "Price per person is required!"],
    },
    images: {
      type: [String],
      required: [true, "At least one image is required!"],
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
    peopleFavourite: [
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

offerSchema.pre(/^find/, function (next) {
  this.select("-__v  -updatedAt").populate({
    path: "country",
    select: "name",
  });
  next();
});

offerSchema.pre("findOne", function (next) {
  this.populate({
    path: "agency",
    select: "agencyName offers",
    populate: {
      path: "offers",
      select:
        "-description -__v -ratingsQuantity -rating -peopleBooked -createdAt",
    },
    options: { limit: 3, sort: { createdAt: -1 } },
  });
  next();
});

offerSchema.post("save", async function () {
  await Promise.all([
    Country.findByIdAndUpdate(this.country, {
      $push: { offers: this._id },
    }),
    Agency.findByIdAndUpdate(this.agency, { $push: { offers: this._id } }),
  ]);
});

offerSchema.post("deleteOne", async function () {
  await Promise.all([
    Review.deleteMany({ offer: this._id }),
    Booking.deleteMany({ offer: this._id }),
    Agency.findByIdAndUpdate(this.agency, { $pull: { offer: this._id } }),
    Country.findByIdAndUpdate(this.country, { $pull: { offer: this._id } }),
  ]);
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
