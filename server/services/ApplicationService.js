const Application = require("../model/ApplicationSchema");
const { GetById } = require("./JobService");

const ApplicationService = {
  getAllApplication: async () => {
    try {
      return await Application.find().populate("jobId userId");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  create: async (payload) => {
    try {
      return await Application.create(payload);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  update: async (id, payload) => {
    try {
      return await Application.findByIdAndUpdate(id, payload, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getApplicationsByUserId: async (userId) => {
    try {
      return await Application.find({ userId }).populate("jobId");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getApplicationsByJobId: async (jobId) => {
    try {
      const job = await GetById(jobId);
      const applications = await Application.find({ jobId }).populate("userId");
      return { job, applications };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = ApplicationService;
