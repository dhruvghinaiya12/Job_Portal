import React, { useEffect, useState } from "react";
import ApiLink from "../config/API";
import { UserToken } from "../UserToken";
import { Role } from "../role/CheckRole";
import UserProfileCard from "../components/UserProfileCard";

const Profile = () => {
  const [applications, setApplications] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showApplications, setShowApplications] = useState(false); 

  const fetchApplications = async () => {
    try {
      if (Role(["Candidate"])) {
        const userId = UserToken()?.id;
        if (!userId) return;

        //  Get applications for this candidate
        const appRes = await ApiLink.get(`applications/user/${userId}`);
        setApplications(appRes.data);

        // Get user basic info
        const infoRes = await ApiLink.get(`user/info/${userId}`);
        setUserInfo(infoRes.data.user);

        //  Get user details
        const detailsRes = await ApiLink.get(`/user-details/user/${userId}`);
        setUserDetails(detailsRes.data.userDetails);

        setShowApplications(false); 
      } else {
        const appRes = await ApiLink.get("applications");
        const apps = appRes.data;

        const updatedApps = await Promise.all(
          apps.map(async (app) => {
            try {
              const detailsRes = await ApiLink.get(
                `/user-details/user/${app.userId}`
              );
              return {
                ...app,
                userDetails: detailsRes.data.userDetails,
              };
            } catch (err) {
              console.warn(`User details not found for ID ${app.userId}`);
              return app;
            }
          })
        );

        setApplications(updatedApps);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="container mx-auto p-6 text-gray-900">
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "rgb(138, 43, 226)" }}
      >
        {Role(["Candidate"])
          ? "Candidate Profile"
          : Role(["HR"])
          ? "HR Profile"
          : Role(["Admin"])
          ? "Admin Profile"
          : "User Profile"}
      </h2>
      {Role(["Candidate"]) && userDetails && (
        <UserProfileCard userDetails={userDetails} user={userInfo} />
      )}

      {Role(["Candidate"]) && (
        <div className="text-center my-4">
          <button
            onClick={() => setShowApplications((prev) => !prev)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {showApplications ? "Hide Applications" : "Show Applications"}
          </button>
        </div>
      )}

      {Role(["Candidate"]) ? (
        showApplications ? (
          applications.length === 0 ? (
            <p className="text-gray-600 text-center">No applications found.</p>
          ) : (
            <ApplicationsTable applications={applications} />
          )
        ) : null
      ) : (
        <>
          {applications.length === 0 ? (
            <p className="text-gray-600 text-center">No applications found.</p>
          ) : (
            <ApplicationsTable applications={applications} />
          )}

          {applications.map((app, index) =>
            app.userDetails ? (
              <UserProfileCard
                key={index}
                userDetails={app.userDetails}
                user={userInfo}
              />
            ) : null
          )}
        </>
      )}
    </div>
  );
};

const ApplicationsTable = ({ applications }) => (
  <div className="overflow-x-auto rounded-lg shadow-lg mb-10">
    <table className="w-full border border-gray-300 rounded-lg">
      <thead>
        <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
          <th className="px-6 py-3 border">Job Title</th>
          <th className="px-6 py-3 border">Job Type</th>
          <th className="px-6 py-3 border">Location</th>
          <th className="px-6 py-3 border">Salary</th>
          <th className="px-6 py-3 border">Status</th>
          <th className="px-6 py-3 border">Applied Date</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app, index) => (
          <tr
            key={index}
            className="border text-center hover:bg-gray-100 transition-all duration-300"
          >
            <td className="px-6 py-4 border">{app.jobId?.title || "N/A"}</td>
            <td className="px-6 py-4 border">{app.jobId?.jobType || "N/A"}</td>
            <td className="px-6 py-4 border">{app.jobId?.location || "N/A"}</td>
            <td className="px-6 py-4 border">{app.jobId?.salary || "N/A"}</td>
            <td className="px-6 py-4 border text-green-600 font-semibold">
              {app.status}
            </td>
            <td className="px-6 py-4 border">
              {new Date(app.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Profile;
