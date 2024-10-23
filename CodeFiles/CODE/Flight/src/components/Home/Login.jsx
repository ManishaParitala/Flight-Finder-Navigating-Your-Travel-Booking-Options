// src/components/Login.js

import React, { useState } from 'react';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import {loginAdmin} from '../../Actions/Admin';
import { loginCustomer } from '../../Actions/Customer';
import { Link } from 'react-router-dom';



const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if(formData.email === "admin@gmail.com" && formData.password === "admin"){
      dispatch(loginAdmin(formData));
    } else {
      dispatch(loginCustomer(formData));
    }
  };

  const [showforgot , setshowforgot] = useState(false)

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen">
        {/* Video Section */}
        <div className="flex justify-center items-center md:w-1/2">
          <video 
            src="/icon.mp4" 
            className="w-full h-full object-cover" 
            autoPlay 
            loop 
            muted 
          />
        </div>

        {/* Form Section */}
        <div className="flex justify-center items-center md:w-1/2">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Login</button>
            <Link to={'/forgot'}  className=' mt-2 text-lg underline text-blue-400 ml-28 cursor-pointer'>forgot password</Link>
          </form>
        </div>
      </div>

      
    
    </div>
  );
};

export default Login;
