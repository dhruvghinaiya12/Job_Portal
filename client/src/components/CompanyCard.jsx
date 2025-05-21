import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const CompanyCard = ({ companyName, location, number, _id, onApprove }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-2">{companyName}</h2>
      <p className="text-gray-700">
        <span className="font-medium">Location:</span> {location}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Contact:</span> {number}
      </p>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => onApprove(_id)}
          className="flex items-center gap-1 bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-500 transition cursor-pointer"
        >
          <CheckCircleIcon className="h-5 w-5" />
          Approve
        </button>
        <button
          className="flex items-center gap-1 bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-500 transition cursor-pointer"
        >
          <XCircleIcon className="h-5 w-5" />
          Reject
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
