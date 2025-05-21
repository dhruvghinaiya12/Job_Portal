import React from "react";

const UserProfileCard = ({ user, userDetails }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border mb-10">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={user?.img || "https://via.placeholder.com/150"}
          alt={user?.name || "User Image"}
          className="w-32 h-32 rounded-full border shadow-md"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {user?.name || "Name not available"}
          </h1>
          <p className="text-gray-600">{user?.email || "Email not available"}</p>
          <p className="text-gray-500">📞 {user?.number || "Phone not available"}</p>
          <p className="text-gray-500 capitalize">
            🔹 {user?.gender || "Gender not specified"} | {user?.role || "Role not specified"}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {userDetails?.skills?.length > 0 ? (
            userDetails.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500">User has not added any skills yet.</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Education</h2>
        {userDetails?.education?.length > 0 ? (
          <ul className="space-y-4">
            {userDetails.education.map((edu, index) => (
              <li key={index} className="p-4 border rounded-lg shadow-sm">
                <h3 className="text-lg font-medium">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institutionName || edu.institution}</p>
                <p className="text-sm text-gray-500">
                  {edu.startDate ? new Date(edu.startDate).getFullYear() : edu.year} -{" "}
                  {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}{" "}
                  {edu.educationStatus ? `(${edu.educationStatus})` : ""}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">User has not added any education details yet.</p>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Work Experience</h2>
        {userDetails?.workExperiences?.length > 0 ? (
          <ul className="space-y-4">
            {userDetails.workExperiences.map((exp, index) => (
              <li key={index} className="p-4 border rounded-lg shadow-sm">
                <h3 className="text-lg font-medium">{exp.jobTitle || exp.position}</h3>
                <p className="text-gray-600">{exp.companyName || exp.company}</p>
                <p className="text-sm text-gray-500">
                  {exp.startDate ? new Date(exp.startDate).getFullYear() : exp.years} -{" "}
                  {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
                </p>
                {exp.jobDescription && (
                  <p className="text-gray-700 mt-2">{exp.jobDescription}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">User has not added any work experience yet.</p>
        )}
      </div>

      <div className="text-center mt-8">
        {userDetails?.resumeUrl ? (
          <a
            href={userDetails.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition cursor-pointer"
          >
            📄 Download Resume
          </a>
        ) : (
          <p className="text-gray-500">User has not uploaded a resume yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
