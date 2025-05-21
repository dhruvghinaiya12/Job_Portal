import React, { useState } from "react";
import ApiLink from "../config/API";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    jobType: "",
    location: "",
    salary: "",
    requiredSkills: "",
    description: "",
    requiredExp: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const PostJobs = async (updatedFormData) => {
    try {
      let res = await ApiLink.post("/jobs", updatedFormData);
      toast.success("Job added successfully!", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => nav("/"),
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Job creation failed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Error creating job:", error);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let { requiredSkills } = formData;

    let updatedFormData = { 
      ...formData, requiredSkills: requiredSkills.split(","), 
     };

    PostJobs(updatedFormData);

    setFormData({
      title: "",
      jobType: "",
      location: "",
      salary: "",
      requiredSkills: "",
      description: "",
      requiredExp: "",
      endDate: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-8 pb-8">
      <form
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Add Job</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Enter job title"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Job Type
          </label>
          <select
            name="jobType"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          >
            <option value="">Select Job Type</option>
            <option value="parttime">Part-Time</option>
            <option value="fullTime">Full-Time</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            onChange={handleChange}
            placeholder="Enter location"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Salary</label>
          <input
            type="text"
            name="salary"
            onChange={handleChange}
            placeholder="Enter salary"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Required Skills
          </label>
          <input
            type="text"
            name="requiredSkills"
            onChange={handleChange}
            placeholder="Enter skills (comma separated)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Job Description
          </label>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Enter job description"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Required Experience
          </label>
          <input
            type="text"
            name="requiredExp"
            onChange={handleChange}
            placeholder="Enter required experience"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Job
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddJob;
