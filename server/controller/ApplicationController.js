const ApplicationService = require("../services/ApplicationService");

const ApplicationController = {
  getAllApplications: async (req, res) => {
    try {
      const applications = await ApplicationService.getAllApplication();
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createApplication: async (req, res) => {
    try {
      req.body.userId = req.user.id; 
      const newApplication = await ApplicationService.create(req.body);
      res.status(201).json(newApplication);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  
  updateApplication: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedApplication = await ApplicationService.update(id, req.body);
      res.status(200).json(updatedApplication);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getMyApplications: async (req, res) => {
    try {
      const userId = req.user.id;
      const applications = await ApplicationService.getApplicationsByUserId(userId);
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getApplicationsByJobId: async (req, res) => {
    try {
      const { jobId } = req.params;
      const applications = await ApplicationService.getApplicationsByJobId(jobId);
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getApplicationsByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const applications = await ApplicationService.getApplicationsByUserId(userId);
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = ApplicationController;
