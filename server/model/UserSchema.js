const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    img: String,
    email: String,
    gender: { type: String, enum: ["male", "female", "other"] },
    number: String,
    password: String,
    role: {
      type: String,
      enum: ["Admin", "HR", "Candidate"],
      default: "Candidate",
    },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;