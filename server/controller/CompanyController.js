const companyService = require("../services/CompanyService");

exports.createCompany = async (req, res) => {
  try {
    const payload=req.body
    let userId=req.user.id;
    req.body.userId=userId;
    const company = await companyService.createCompany(payload);
    console.log(payload);
    
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const updatedCompany = await companyService.updateCompany(req.params.id, req.body);
    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const deletedCompany = await companyService.deleteCompany(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.UnverifiedCompany = async (req, res) => {
  try {
    let company=await companyService.getAllunverified()
    return res.send(company)
  } catch (error) {
    return res.status(500).json({error: error })
  }
}