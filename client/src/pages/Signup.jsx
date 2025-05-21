import React, { useState } from "react";
import { put } from "@vercel/blob";
import ApiLink from "../config/API";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const nav = useNavigate();
  const [userdata, setUserData] = useState({
    name: "",
    img: "",
    email: "",
    gender: "",
    number: "",
    password: "",
    role: "Candidate",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userdata, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const { url } = await put(file.name, file, {
        access: "public",
        token: "vercel_blob_rw_5fhPjJof3FeC7W2N_NIdVrcg36Xm6qXZ2tNgfGxTofmlvth",
      });

      setUserData({ ...userdata, img: url });

      toast.success("Image uploaded successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed. Please try again.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const signup = async () => {
    try {
      await ApiLink.post("/user/signup", userdata);

      toast.success("Signup successful", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => nav("/login"),
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(error.response?.data?.message || "Error creating user", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
    setUserData({
      name: "",
      img: "",
      email: "",
      gender: "",
      number: "",
      password: "",
      role: "Candidate",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-8 pb-8">
      <form
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Sign Up
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={userdata.name}
            onChange={handleInput}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={userdata.email}
            onChange={handleInput}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={userdata.password}
            onChange={handleInput}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={userdata.gender}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Number</label>
          <input
            type="text"
            name="number"
            value={userdata.number}
            onChange={handleInput}
            placeholder="Enter your phone number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Role</label>
          <select
            name="role"
            value={userdata.role}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            <option value="Candidate">Candidate</option>
            <option value="HR">HR</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500"
        >
          Sign Up
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
