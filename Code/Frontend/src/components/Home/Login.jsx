import React, { useState } from 'react';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../../Actions/Admin';
import { loginCustomer } from '../../Actions/Customer';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email === "admin@gmail.com" && formData.password === "admin") {
      dispatch(loginAdmin(formData));
    } else {
      dispatch(loginCustomer(formData));
    }
  };

  return (
    <div>
      <Navbar />
      <div className='bg-yellow-50 font-sans min-h-screen flex flex-col items-center justify-center py-6 px-4'>
        <div className="max-w-md w-full">
          <a href="#">
            <img
              src="https://www.svgrepo.com/show/416333/airplane-plane-flight.svg"
              alt="logo"
              className="w-40 mb-8 mx-auto block"
            />
          </a>
          <div className="p-8 rounded-2xl bg-gray-600 shadow">
            <h2 className="text-white text-center text-2xl font-bold">Sign in</h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="text-orange-300 text-bold mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-gray-700 text-xl border border-gray-300 px-4 py-3 rounded-md outline-none focus:ring focus:ring-orange-600"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div>
                <label className="text-orange-300 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-none focus:ring focus:ring-orange-600"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-orange-400 hover:bg-blue-700 focus:outline-none transition duration-200"
                >
                  Sign in
                </button>
              </div>
              <p className="text-white text-sm !mt-8 text-center">
                Don't have an account?
                <a href="/register" className="text-white text-1xl hover:gray-900 hover:underline ml-1 whitespace-nowrap font-semibold">
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;