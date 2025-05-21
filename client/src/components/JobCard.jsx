import React from "react";
import { Role } from "../role/CheckRole";

const JobCard = ({
  _id,
  title,
  salary,
  requiredSkills,
  requiredExp,
  location,
  jobType,
  description,
  endDate,
  ApplyJob,
  nav,
}) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-2">{title}</h2>
      <p className="text-gray-700">
        <span className="font-medium">Salary:</span> {salary}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Required Skills:</span> {requiredSkills}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Experience:</span> {requiredExp}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Location:</span> {location}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Job Type:</span> {jobType}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Description:</span> {description}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">End Date:</span> {formatDate(endDate)}
      </p>

      {Role(["Candidate"]) && (
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition cursor-pointer"
          onClick={() => ApplyJob(_id)}
          aria-label="Apply for job"
        >
          Apply
        </button>
      )}

      {Role(["HR", "Admin"]) && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition ml-2 cursor-pointer"
          onClick={() => nav(`/job/${_id}`)}
        >
          View
        </button>
      )}
    </div>
  );
};

export default JobCard;
