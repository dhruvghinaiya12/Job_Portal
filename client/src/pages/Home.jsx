import React, { useEffect, useState } from "react";
import ApiLink from "../config/API";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const nav = useNavigate();

  const displayJobs = async () => {
    try {
      let res = await ApiLink.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load job listings", {
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
    displayJobs();
  }, []);

  const ApplyJob = async (jobId) => {
    try {
      await ApiLink.post("/applications", { jobId: jobId });
      toast.success("Application submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => nav("/"), 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error applying job:", error);
      toast.error(error.message || "Error applying to job", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      {jobs.length > 0 ? (
        <div>
          <h1 className="text-3xl font-bold text-center mb-6">Job Listings</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} {...job} ApplyJob={ApplyJob} nav={nav} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No job listings available at the moment.
        </p>
      )}
    </div>
  );
};

export default Home;
