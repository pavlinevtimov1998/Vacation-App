const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const agencySchema = new mongoose.Schema(
  {
    agencyName: {
      type: String,
      required: [true, "Agency name is required!"],
      minLength: [4, "Agency name should be at least 2 characters!"],
      maxLength: [25, "Agency name should be max 25 characters!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      minLength: [10, "Email should be at least 10 characters!"],
      maxLength: [30, "Email should be max 30 characters!"],
    },
    password: {
      type: String,
      minLength: [4, "Password should be at least 4 characters!"],
      maxLength: [20, "Password should be max 20 characters!"],
      required: [true, "Password is required!"],
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

agencySchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(
    this.password,
    Number(process.env.SALT)
  );

  this.password = hashedPassword;

  next();
});

const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;
