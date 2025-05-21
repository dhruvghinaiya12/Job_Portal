// AllRoutes.js
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AddJob from '../pages/AddJob';
import Company from '../pages/Company';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/profile';
import JobsDetails from '../pages/JobsDetails';
import UserDetails from '../pages/UserDetails';
import PageNotFound from '../pages/PageNotFound';
import Private from './Private';
import { Role } from '../role/CheckRole';
import UserDetailsForm from '../pages/UserDetailsForm';

const AllRoutes = () => {
  return (
       <Routes>
        <Route path="/" element={<Private><Home/></Private>} />
        <Route path="/profile" element={<Private><Profile/></Private>} />
        {Role(["Admin"])?(<Route path="/dashboard" element={<Private><Dashboard/></Private>} />):null}
        {Role(["HR"])?( <Route path="/company" element={<Private><Company/></Private>} />):null}
        {Role(["HR"])?(<Route path="/jobs" element={<Private><AddJob/></Private>} />):null}

        {Role(["Candidate"]) ? (
          <Route path="/user-details" element={<Private><UserDetailsForm /></Private>} />
        ) : null}

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/job/:id" element={<JobsDetails />} />
        <Route path='/job/:jobId/user/:id' element={<UserDetails />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
  )
}

export default AllRoutes;
