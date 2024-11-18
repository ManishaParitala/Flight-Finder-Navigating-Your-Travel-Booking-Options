import React, { useState } from 'react';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { registerCustomer } from '../../Actions/Customer';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '', cpassword: '', phone: '', address: '' });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      alert("Passwords do not match");
      return;
    }
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
    <div className="">
      <Navbar />
      <div className='flex flex-col justify-center font-sans min-h-screen p-4 bg-yellow-50'>
        <div className="max-w-md w-full mx-auto border border-gray-900 rounded-2xl p-8 bg-gray-500 shadow-lg">
          <div className="text-center mb-12">
            <a href="#">
              <img
                src="https://www.svgrepo.com/show/416333/airplane-plane-flight.svg"
                alt="logo"
                className="w-40 inline-block"
              />
            </a>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="text-white text-sm mb-2 block">Email Id</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Confirm Password</label>
                <input
                  name="cpassword"
                  type="password"
                  value={formData.cpassword}
                  onChange={handleChange}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter confirm password"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Address</label>
                <input
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter address"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">Photo</label>
                <input
                  name="photo"
                  type="file"
                  onChange={handleFileChange}
                  required
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-none focus:ring focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  required
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="text-white ml-3 block text-sm">
                  I accept the
                  <a href="#" className="text-orange-400 font-bold hover:underline ml-1">Terms and Conditions</a>
                </label>
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition duration=200"
              >
                Create an account
              </button>
            </div>
            <p className="text-white text-sm mt=6 text-center">
              Already have an account?
              <a href="#" className="text-white font-semibold hover:underline ml=1">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;