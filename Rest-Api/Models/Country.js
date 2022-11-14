const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  country: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Country is required!"],
  },
  image: {
    type: String,
    required: true,
  },
  offersId: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Offer",
      default: [],
    },
  ],
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
