const mongoose = require("mongoose");

const CompanyProfile=new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
},{
  timestamps: true,
})

const Company=mongoose.model("Company",CompanyProfile)

module.exports=Company;