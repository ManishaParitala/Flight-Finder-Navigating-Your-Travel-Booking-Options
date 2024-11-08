import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendotp, otpverifycation, forgotpassword } from '../../Actions/Customer';
import { toast } from 'react-toastify';

const ForgotPasswordModal = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, message } = useSelector((state) => state.customer); // Access the state outside the function

  // Send OTP
  const handleSendCode = () => {
    if (!email) {
      toast.error('Please enter an email');
      return;
    }
    dispatch(sendotp(email));
    console.log('Verification code sent to:', email);
    setIsCodeSent(true);
  };

  // Verify OTP
  const handleVerifyCode = () => {
    if (!verificationCode) {
      toast.error('Please enter the verification code');
      return;
    }
    dispatch(otpverifycation(email, verificationCode));

    if (success) {
      toast.success('OTP verified successfully');
      setIsVerified(true); // Proceed to the password reset form
    } else {
      toast.error('Invalid OTP');
    }
  };

  // Update Password
  const handleUpdatePassword = () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const data = {
      email,
      password: newPassword,
      confirmPassword,
    };

    dispatch(forgotpassword(data));
    if (success) {
      toast.success('Password updated successfully');
      navigate('/login'); // Redirect to login page
    } else {
      toast.error(message || 'Failed to update password');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
        <h4 className="text-lg font-bold mb-4">Forgot Password</h4>

        {!isCodeSent ? (
          // Step 1: Enter email and send verification code
          <>
            <p className="mb-4">Enter your email to receive a verification code.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="border p-2 mb-4 w-full rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              onClick={handleSendCode}
              className="bg-blue-600 text-white p-2 rounded w-full"
            >
              Send Verification Code
            </button>
          </>
        ) : !isVerified ? (
          // Step 2: Enter verification code
          <>
            <p className="mb-4">Enter the 4-digit verification code sent to your email.</p>
            <input
              type="text"
              placeholder="Enter 4-digit code"
              className="border p-2 mb-4 w-full rounded"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
            <button
              onClick={handleVerifyCode}
              className="bg-green-600 text-white p-2 rounded w-full"
            >
              Verify Code
            </button>
          </>
        ) : (
          // Step 3: Enter new password and confirm
          <>
            <p className="mb-4">Enter your new password.</p>
            <input
              type="password"
              placeholder="New password"
              className="border p-2 mb-4 w-full rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="border p-2 mb-4 w-full rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              onClick={handleUpdatePassword}
              className="bg-purple-600 text-white p-2 rounded w-full"
            >
              Update Password
            </button>
          </>
        )}

        {/* Close Button */}
        <Link
          to={'/login'}
          className="bg-red-600 text-white p-2 rounded w-full mt-4 text-center"
        >
          Close
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
