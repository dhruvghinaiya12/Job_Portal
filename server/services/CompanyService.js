const companyRepository = require("../repository/CompanyRepo");

exports.createCompany = async (payload) => {
  try {
    return await companyRepository.createCompany(payload);
  } catch (error) {
    throw new Error("Error creating company: " + error.message);
  }
};

exports.getAllCompanies = async () => {
  try {
    return await companyRepository.getAllCompany();
  } catch (error) {
    throw new Error("Error fetching companies: " + error.message);
  }
};

exports.getCompanyById = async (id) => {
  try {
    return await companyRepository.getCompanyById(id);
  } catch (error) {
    throw new Error("Error fetching company by ID: " + error.message);
  }
};

exports.updateCompany = async (id, payload) => {
  try {
    return await companyRepository.updateCompany(id, payload);
  } catch (error) {
    throw new Error("Error updating company: " + error.message);
  }
};

exports.deleteCompany = async (id) => {
  try {
    return await companyRepository.deleteCompany(id);
  } catch (error) {
    throw new Error("Error deleting company: " + error.message);
  }
};

exports.getAllunverified=async()=>{
  let company=await companyRepository.getAllCompany({isVerified:false})
  return company
}


exports.getCompanyByUserId = async (userId) => {
  try {
    return await companyRepository.getCompanyByUserId(userId);
  } catch (error) {
    throw new Error("Error fetching company by user ID: " + error.message);
  }
}
