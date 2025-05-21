import React, { useState, useEffect } from "react";
import ApiLink from "../config/API";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetailsForm = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [detailsExist, setDetailsExist] = useState(false);
  const [formData, setFormData] = useState({
    skills: [],
    workExperiences: [
      {
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        jobDescription: "",
        jobStatus: "running",
      },
    ],
    education: [
      {
        institutionName: "",
        degree: "",
        startDate: "",
        endDate: "",
        educationStatus: "running",
      },
    ],
    resumeUrl: "",
    experienceLevel: "fresher",
  });


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await ApiLink.get(`/user-details/${userId}`);
        if (res.data.userDetails) {
          setDetailsExist(true);
          toast.error("User details already exist. You cannot add again.");
        }
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          toast.error("Error fetching user details");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  const skillsString = formData.skills.join(", ");

  const handleChange = (e, index, section) => {
    const { name, value } = e.target;
    if (section) {
      const list = [...formData[section]];
      list[index][name] = value;
      setFormData({ ...formData, [section]: list });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSkillsChange = (e) => {
    const skillsArr = e.target.value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    setFormData({ ...formData, skills: skillsArr });
  };

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperiences: [
        ...formData.workExperiences,
        {
          companyName: "",
          jobTitle: "",
          startDate: "",
          endDate: "",
          jobDescription: "",
          jobStatus: "running",
        },
      ],
    });
  };

  const removeWorkExperience = (index) => {
    const list = [...formData.workExperiences];
    list.splice(index, 1);
    setFormData({ ...formData, workExperiences: list });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          institutionName: "",
          degree: "",
          startDate: "",
          endDate: "",
          educationStatus: "running",
        },
      ],
    });
  };

  const removeEducation = (index) => {
    const list = [...formData.education];
    list.splice(index, 1);
    setFormData({ ...formData, education: list });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (detailsExist) {
      toast.error("User details already exist. Cannot submit again.");
      return;
    }

    try {
      await ApiLink.post("/user-details", formData);
      toast.success("User details saved successfully", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => nav("/profile"),
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error(error.response?.data?.error || "Error saving user details", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (detailsExist) {
    return (
      <div className="p-6 max-w-xl mx-auto mt-10 bg-yellow-100 text-yellow-800 rounded-lg text-center">
        You have already added your details. You cannot add again.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-10">
      <form
        className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <ToastContainer />
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          User Details Form
        </h2>

        {/* Skills */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Skills (Comma separated):
          </label>
          <input
            type="text"
            name="skills"
            value={skillsString}
            onChange={handleSkillsChange}
            placeholder="e.g. React, Node.js, MongoDB"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800"
            required
          />
        </div>

        {/* Experience Level */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Experience Level:
          </label>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="fresher">Fresher</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>

        {/* Resume URL */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Resume URL:
          </label>
          <input
            type="url"
            name="resumeUrl"
            value={formData.resumeUrl}
            onChange={handleChange}
            placeholder="e.g. https://example.com/resume.pdf"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Work Experiences */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Work Experiences:
          </label>
          {formData.workExperiences.map((we, i) => (
            <div
              key={i}
              className="border border-gray-300 p-4 mb-4 rounded-lg bg-gray-50 relative"
            >
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => removeWorkExperience(i)}
                  className="absolute top-2 right-1 text-red-600 hover:text-red-800 font-bold"
                  title="Remove Work Experience"
                >
                  &times;
                </button>
              )}
              <input
                type="text"
                name="companyName"
                value={we.companyName}
                onChange={(e) => handleChange(e, i, "workExperiences")}
                placeholder="Company Name"
                className="w-full mb-2 px-3 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="jobTitle"
                value={we.jobTitle}
                onChange={(e) => handleChange(e, i, "workExperiences")}
                placeholder="Job Title"
                className="w-full mb-2 px-3 py-2 border rounded"
                required
              />
              <input
                type="date"
                name="startDate"
                value={we.startDate}
                onChange={(e) => handleChange(e, i, "workExperiences")}
                className="w-full mb-2 px-3 py-2 border rounded"
                required
              />
              <input
                type="date"
                name="endDate"
                value={we.endDate}
                onChange={(e) => handleChange(e, i, "workExperiences")}
                className="w-full mb-2 px-3 py-2 border rounded"
                required
              />
              <textarea
                name="jobDescription"
                value={we.jobDescription}
                onChange={(e) => handleChange(e, i, "workExperiences")}
                placeholder="Job Description"
                className="w-full mb-2 px-3 py-2 border rounded"
                required
              ></textarea>
              <select
                name="jobStatus"
                value={we.jobStatus}
                onChange={(e) => handleChange(e, i, "workExperiences")}
                className="w-full mb-2 px-3 py-2 border rounded"
                required
              >
                <option value="running">Running</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          ))}
          <button
            type="button"
            onClick={addWorkExperience}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Another Work Experience
          </button>
        </div>

        {/* Education */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Education:
          </label>
          {formData.education.map((edu, i) => (
            <div
              key={i}
              className="border border-gray-300 p-4 mb-4 rounded-lg bg-gray-50 relative"
            >
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => removeEducation(i)}
                  className="absolute top- right-1 text-red-600 hover:text-red-800 font-bold"
                  title="Remove Education"
                >
                  &times;
                </button>
              )}
              <input
                type="text"
                name="institutionName"
                value={edu.institutionName}
                onChange={(e) => handleChange(e, i, "education")}
                placeholder="Institution Name"
                className="w-full mb-2 px-3 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleChange(e, i, "education")}
                placeholder="Degree"
                className="w-full mb-2 px-3 py-2 border rounded"
                required
              />
              <input
                type="date"
                name="startDate"
                value={edu.startDate}
                onChange={(e) => handleChange(e, i, "education")}
                className="w-full mb-2 px-3 py-2 border rounded"
                required
              />
              <input
                type="date"
                name="endDate"
                value={edu.endDate}
                onChange={(e) => handleChange(e, i, "education")}
                className="w-full mb-2 px-3 py-2 border rounded"
                required
              />
              <select
                name="educationStatus"
                value={edu.educationStatus}
                onChange={(e) => handleChange(e, i, "education")}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="running">Running</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Another Education
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserDetailsForm;
