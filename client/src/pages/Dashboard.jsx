import React, { useState, useEffect } from "react";
import ApiLink from "../config/API";
import CompanyCard from "../components/CompanyCard";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
  const nav = useNavigate();
  const [companies, setCompanies] = useState([]);

  const getUnverifiedCompany = async () => {
    try {
      let res = await ApiLink.get("/companies/admin/unverified");
      setCompanies(res.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await ApiLink.patch(`/companies/${id}`, { isVerified: true });
      setCompanies((prev) => prev.filter((company) => company._id !== id));
      toast.success("Company verified successfully!", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => nav("/"),
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error approving company:", error);
      toast.error(error.response?.data?.message || "Company verification failed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    getUnverifiedCompany();
  }, []);

  return (
    <div className="flex items-center justify-center pt-5 bg-gray-100 min-h-[calc(100vh-72px)]">
      <ToastContainer />
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
          Unverified Companies
        </h2>

        {companies.length > 0 ? (
          <div className="space-y-4">
            {companies.map((company) => (
              <CompanyCard
                key={company._id}
                {...company}
                onApprove={handleApprove}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No unverified companies found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
