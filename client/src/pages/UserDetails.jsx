import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiLink from "../config/API";
import UserDetailsCard from "../components/UserDetailsCard";
import { toast, ToastContainer } from "react-toastify";

const UserDetails = () => {
  const nav = useNavigate();
  const [userData, setUserData] = useState(null);
  const { id, jobId } = useParams();
  const [status, SetStatus] = useState("Applied");
  const StatusOptions = ["Applied", "Shortlisted", "Rejected", "Hired"];

  const getUserDetails = async () => {
    try {
      let res = await ApiLink.get(`user/info/${id}`);
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateStatus = async (value) => {
    try {
      let res = await ApiLink.patch(`applications/${jobId}`, { status: value }); 
      toast.success("Status updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => nav("/"),
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Status update failed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  };

  const HandleStatus= async (e) => {
    SetStatus(e.target.value)
    UpdateStatus(e.target.value)
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  if (!userData) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <UserDetailsCard
        user={userData.user}
        userDetails={userData.userDetails}
        status={status}
        statusOptions={StatusOptions}
        HandleStatus={HandleStatus}
      />
    </div>
  );
};

export default UserDetails;
