import React, { useState } from "react";
import ApiLink from "../config/API";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Company = () => {
  const nav = useNavigate();
  const [company, setCompany] = useState({
    companyName: "",
    location: "",
    number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const createCompany = async () => {
    try {
      let res = await ApiLink.post("/companies/create", company);
      toast.success("Company created successfully!", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => nav("/"),
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setCompany({ companyName: "", location: "", number: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Company creation failed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Error creating company:", error);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    createCompany();
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-[calc(100vh-72px)]">
      <form
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Create Company</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={company.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={company.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Contact Number</label>
          <input
            type="number"
            name="number"
            value={company.number}
            onChange={handleChange}
            placeholder="Enter contact number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Company
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Company;
