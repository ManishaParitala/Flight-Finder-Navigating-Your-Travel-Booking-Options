import React, { useState } from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../Actions/Customer';







// Dummy data for user profile
const dummyUserData = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "09012345678",
    password: "password123", // Password shouldn't be displayed
    address: "123 Main St, Springfield",
    photo: "https://via.placeholder.com/150" // Placeholder image
};

const UserProfile = () => {
    const [userData] = useState(dummyUserData);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');



    const dispatch = useDispatch();
    const customer = JSON.parse(sessionStorage.getItem('customer'));

    console.log(customer, "customer");





    const handleChangePassword = () => {
        dispatch(updateProfile(customer._id, { password: newPassword, oldpassword: oldPassword }));

        console.log("Old Password:", oldPassword);
        console.log("New Password:", newPassword);



        setOldPassword('');
        setNewPassword('');
        setIsChangingPassword(false);
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-md mx-auto bg-blue-200 shadow-md rounded-lg p-6 mt-10">
                <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
                <div className="flex items-center mb-4">
                    <img src={`http://localhost:4000/uploads/customers/${customer.photo}`} alt="Profile" className="w-24 h-24 rounded-full mr-4" />
                    <div>
                        <h3 className="text-xl font-semibold">{customer.name}</h3>
                        <p className="text-gray-600">{customer.email}</p>
                        <p className="text-gray-600">{customer.phone}</p>
                        <p className="text-gray-600">{customer.address}</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsChangingPassword(true)}
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Change Password
                </button>
            </div>

            {/* Change Password Modal */}
            {isChangingPassword && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-yellow-200 rounded-lg shadow-lg p-6 max-w-sm mx-auto">
                        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700">Old Password</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="border rounded-md w-full py-2 px-3"
                                placeholder="Enter your old password"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="border rounded-md w-full py-2 px-3"
                                placeholder="Enter your new password"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handleChangePassword}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => setIsChangingPassword(false)}
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
