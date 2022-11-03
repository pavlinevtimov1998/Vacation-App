const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const businessSchema = new mongoose.Schema({
  companyName: {
    type: String,
    // required: [true, "Company name is required!"],
    // minLength: [2, "Company name should be at least 2 characters!"],
  },
  email: {
    type: String,
    // required: [true, "Email is required!"],
    // minLength: [10, "Email should be at least 10 characters!"],
  },
  password: {
    type: String,
    // minLength: [4, "Password should be at least 4 characters!"],
    // required: [true, "Password is required!"],
  },
});

businessSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(
    this.password,
    Number(process.env.SALT)
  );

  this.password = hashedPassword;

  next();
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
