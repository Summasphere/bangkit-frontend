import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your password reset logic here
    console.log(email);
    // Optionally navigate somewhere after submit
    // navigate('/path-after-submit');
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 to-sky-950 text-white">
      <img src={logo} alt="logo" className="mx-auto h-20 w-auto mt-8 mb-6" />
      <div className="flex flex-col items-center bg-transparent w-full max-w-md p-6 rounded-lg">
        <p className="text-base font-medium mb-4">
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label htmlFor="email" className="block text-base font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 w-full rounded-lg focus:outline-none focus:shadow-outline">
              Continue
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <button onClick={handleSignUpClick} className="font-semibold text-white hover:text-white cursor-pointer">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;