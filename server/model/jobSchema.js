const mongoose  = require("mongoose");
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["parttime", "fullTime"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  requiredSkills: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requiredExp: {
    type: String,
    required: true,
  },
  endDate: { type: Date, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
},
{
  timestamps: true,
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;