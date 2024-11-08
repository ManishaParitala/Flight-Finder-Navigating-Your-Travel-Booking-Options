// src/components/Register.js

import React, { useState } from 'react';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import {registerCustomer} from '../../Actions/Customer';









const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', phone: '', address: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const [photo , setphoto] = useState(null);

  const handleFileChange = (e) => {
    setphoto(e.target.files[0]);
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.username);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('phone', formData.phone);
    data.append('address', formData.address);
    data.append('photo', photo);
    dispatch(registerCustomer(data));

  };

  return (
    <div className="" style={{backgroundImage:`url('/home.png')`}}>
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
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
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
            <input
              type="phone"
              name="phone"
              placeholder="phone"
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <input
              type="address"
              name="address"
              placeholder="address"
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <input
              type="file"
              name="photo"
              placeholder="profile photo"
              onChange={handleFileChange}
              required
              className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
