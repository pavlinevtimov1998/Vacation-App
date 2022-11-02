const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const salt = process.env.SALT;

const businessSchema = new mongoose.Schema({
  companyName: {
    type: String,
    // required: [true, "Username is required!"],
    // minLength: [2, "Username should be at least 2 characters!"],
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
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;

  next();
});

const Business = mongoose.model("Business", userSchema);

module.exports = Business;
