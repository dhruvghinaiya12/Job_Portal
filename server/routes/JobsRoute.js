const express = require("express");
const JobController = require("../controller/JobsController");

const JobsRoutes = express.Router();

JobsRoutes.post("/", JobController.createJob);
JobsRoutes.get("/", JobController.getAllJobs);
JobsRoutes.get("/:id", JobController.getJobById);
JobsRoutes.get("/company/:companyId", JobController.getJobsByCompanyId);
JobsRoutes.put("/:id", JobController.updateJob);
JobsRoutes.delete("/:id", JobController.deleteJob);

module.exports = JobsRoutes;
