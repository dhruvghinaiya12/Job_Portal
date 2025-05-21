const Job = require("../model/jobSchema")
const company=require("../repository/CompanyRepo")

exports.Create = async (data) => {
    try {
        const companyData = await company.getCompanyById(data.companyId);
     
        if (companyData) {
            if (companyData.isVerified) {
                return await Job.create(data);
            } else {
                throw new Error("Company is not verified");
            }
        } else {
            throw new Error("Company not found");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.GetAll=async(query)=>{
    try {
        return await Job.find(query);
    } catch (error) {
        throw new Error(error)
    }
}

exports.GetById=async(id)=>{
    try {
        return await Job.findById(id);
    } catch (error) {
        throw new Error(error)
    }
}

exports.GetByCompanyId=async(companyId)=>{
    try {
        return await Job.find({company:companyId});
    } catch (error) {
        throw new Error(error)
    }
}

exports.Update=async(id,data)=>{
    try {
        return await Job.findByIdAndUpdate(id,data,{new:true});
    } catch (error) {
        throw new Error(error)
    }
}

exports.Delete=async(id)=>{
    try {
        return await Job.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error)
    }
}