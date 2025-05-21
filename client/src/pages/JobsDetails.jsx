import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiLink from "../config/API";
import JobDetailCard from "../components/JobDetailCard";

const JobsDetails = () => {
  const [job, setJob] = useState({});
  const [applied, setApplied] = useState([]);
  let [show, setshow] = useState(false);
  const { id } = useParams();
  const nav = useNavigate();

  const ApplicationDetails = (applications) => {
    let temp = applications.map((app) => ({
      id: app._id,
      name: app.userId?.name || "N/A",
      img: app.userId?.img || "N/A",
      userId: app.userId?._id || "N/A",
      status: app.status,
      createdAt: app.createdAt,
    }));
    setApplied(temp);
  };

  const getJobDetails = async () => {
    try {
      let res = await ApiLink.get(`/applications/job/${id}`);
      setJob(res.data.job); 
      ApplicationDetails(res.data.applications);
    } catch (error) {
      console.log("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    getJobDetails();
  }, [id]);

  return (
    <JobDetailCard
      {...job}
      applied={applied}
      onBack={() => nav(-1)}
      showApplicants={show}
      onViewApplicants={() => setshow(!show)}
      nav={nav}
    />
  );
};

export default JobsDetails;
