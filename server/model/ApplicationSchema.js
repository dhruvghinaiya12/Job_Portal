const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected", "Hired"],
      default: "Applied",
    },
  },
  {
    timestamps: true,
  }
);
const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;