const mongoose = require("mongoose");

const workExperienceSchema = new mongoose.Schema({
  companyName: { type: String, required: true, trim: true },
  jobTitle: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  jobDescription: { type: String, trim: true },
  jobStatus: { type: String, enum: ["completed", "running"] },
});

const educationSchema = new mongoose.Schema({
  institutionName: { type: String, required: true, trim: true },
  degree: { type: String, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  educationStatus: { type: String, enum: ["completed", "running"] },
});

const userInfoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    skills: [{ type: String, trim: true }],
    workExperiences: [workExperienceSchema],
    education: [educationSchema],
    resumeUrl: { type: String, trim: true },
    experienceLevel: {
      type: String,
      enum: ["experienced", "fresher"],
      required: true,
    },
  },
  { timestamps: true }
);

const UserInfo = mongoose.model("UserInfo", userInfoSchema);
module.exports = UserInfo;