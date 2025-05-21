const jobService = require("../services/JobService");
const CompanyService=require("../services/CompanyService")
exports.createJob = async (req, res) => {
    try {
        req.body.userId=req.user.id;
        console.log("User ID:", req.user?.id);

        let company= await CompanyService.getCompanyByUserId(req.user.id);
        console.log("Company found:", company);

        if(!company){
            return res.status(404).json({ message: "Company not found" });
        }
        req.body.companyId=company.id;
        const job = await jobService.Create(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await jobService.GetAll(req.query);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await jobService.GetById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJobsByCompanyId = async (req, res) => {
    try {
        const jobs = await jobService.GetByCompanyId(req.params.companyId);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const updatedJob = await jobService.Update(req.params.id, req.body);
        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const deletedJob = await jobService.Delete(req.params.id);
        if (!deletedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
