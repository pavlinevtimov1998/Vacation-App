const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const config = require("../config/config");

const agencySchema = new mongoose.Schema(
  {
    agencyName: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Agency name is required!"],
      minLength: [4, "Agency name should be at least 2 characters!"],
      maxLength: [50, "Agency name should be max 50 characters!"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required!"],
      minLength: [10, "Email should be at least 10 characters!"],
      maxLength: [30, "Email should be max 30 characters!"],
    },
    image: {
      type: String,
    },
    phone: {
      type: Number,
      trim: true,
    },
    address: {
      trim: true,
      type: String,
    },
    description: {
      trim: true,
      type: String,
    },
    country: {
      type: String,
    },
    town: {
      type: String,
    },
    website: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: [4, "Password should be at least 4 characters!"],
      maxLength: [20, "Password should be max 20 characters!"],
      required: [true, "Password is required!"],
    },
    offers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Offer",
        default: [],
      },
    ],
  },
  { timestamps: { createdAt: "createdAt" } }
);

agencySchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, Number(config.SALT));

  this.password = hashedPassword;

  next();
});

agencySchema.pre("update", function (next) {
  this.setOptions({ runValidators: true });
  next();
});

const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;
