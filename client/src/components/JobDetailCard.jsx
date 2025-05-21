import React from "react";

const JobDetailCard = ({
  title,
  description,
  endDate,
  applied,
  showApplicants,
  onBack,
  onViewApplicants,
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
    <div className="container mx-auto p-6 flex flex-col gap-6">
      <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-4">{title}</h1>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Description:</span> {description}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">End Date:</span> {formatDate(endDate)}
        </p>

        <div className="mt-6 flex gap-4">
          <button
            className="w-1/2 px-4 py-2 bg-gray-700 text-white font-bold rounded hover:bg-gray-800 transition cursor-pointer"
            onClick={onBack}
          >
            Back
          </button>
          <button
            className="w-1/2 px-4 py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 transition cursor-pointer"
            onClick={onViewApplicants}
          >
            {showApplicants ? "Hide Applicants" : "View Applicants"}
          </button>
        </div>
      </div>

      {showApplicants && (
        <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-center mb-4">Applicants</h2>
          {applied.length > 0 ? (
            <ul className="space-y-4">
              {applied.map((app) => (
                <li
                  key={app.id}
                  className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={app.img}
                      alt={app.name}
                      className="w-14 h-14 rounded-full object-cover border"
                    />
                    <div>
                      <p className="text-lg font-medium">{app.name}</p>
                      <p className="text-gray-600">{app.status}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(app.createdAt)}
                      </p>
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 bg-teal-500 text-white text-sm font-bold rounded hover:bg-teal-600 transition cursor-pointer"
                    onClick={() => nav(`/job/${app.id}/user/${app.userId}`)}
                  >
                    View
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No applicants yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default JobDetailCard;
