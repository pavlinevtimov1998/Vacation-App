const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required!"],
      minLength: [5, "Username should be at least 5 characters!"],
      maxLength: [35, "Username should be maximum of 35 characters!"],
    },
    email: {
      type: String,
      trim: true,

      minLength: [10, "Email should be at least 10 characters!"],
      maxLength: [40, "Email should be max 40 characters!"],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: Number,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: [6, "Password should be at least 6 characters!"],
      required: [true, "Password is required!"],
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(
    this.password,
    Number(process.env.SALT)
  );

  this.password = hashedPassword;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
