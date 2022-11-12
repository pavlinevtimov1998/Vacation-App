const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      minLength: [5, "Username should be at least 5 characters!"],
    },
    email: {
      type: String,
      minLength: [10, "Email should be at least 10 characters!"],
      maxLength: [30, "Email should be max 25 characters!"],
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
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
