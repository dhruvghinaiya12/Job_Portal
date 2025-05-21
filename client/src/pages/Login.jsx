import React, { useState } from "react";
import ApiLink from "../config/API";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const nav = useNavigate();

  const [userdata, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userdata, [name]: value });
  };

  const login = async () => {
    try {
      const res = await ApiLink.post("/user/login", userdata);

      Cookies.set("token", res.data.user, { expires: 2 });
      Cookies.set("isLogged", "true", { expires: 2 });

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => nav("/"),
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error logging in user", error);
      toast.error(error.response?.data?.message || "Login failed", {
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
    login();
    setUserData({ email: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-[calc(100vh-72px)]">
      <form
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

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

        <div className="mb-6">
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
