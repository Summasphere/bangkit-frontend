import React from 'react';
import { useNavigate } from 'react-router-dom';
import googleIcon from './assets/googleIcon.png';
import logo from './assets/logo.png'; // Ensure this is the correct path to your logo file
import axios from 'axios';

import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // request json body
    const requestBody = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    }

    const response = await axios.post(import.meta.env.VITE_REACT_APP_BACKEND_URL + '/api/v1/auth/email/login', requestBody, config).catch((error) => {
      switch (error.response.data.status) {
        case 'error':
          toast.error((error.response.data.message) ? error.response.data.message : (error.response.statusText) ? error.response.statusText : 'An unexpected error occurred');
          break;
        default:
      }
    });

    if (response && response.data && response.data.token) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
    // navigate('/'); // Redirect to the home page
  };

  const handleRegisterNowClick = (e) => {
    e.preventDefault();
    navigate('/register'); // Redirect to the registration page
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate('/forgetpassword'); // Redirect to the registration page
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 to-sky-950">
      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <form className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            <div className="mb-4 text-right">
              <a
                onClick={handleForgotPasswordClick}
                className="inline-block align-baseline font-semibold text-sm text-gray-700 hover:text-gray-800 cursor-pointer"
              >
                Forgot Password
              </a>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 w-full rounded-2xl focus:outline-none focus:shadow-outline"
              >
                Log In
              </button>
            </div>
            <div className="flex items-center justify-center mb-3">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-3 text-center text-sm text-gray-600">or</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            {/* Google Login Button */}
            <div className="flex items-center justify-center mb-6">
              <button type="button" className="group w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-2xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <img src={googleIcon} alt="Google sign-in" className="h-6 w-6 mr-3" />
                Login with Google
              </button>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <a
                  onClick={handleRegisterNowClick}
                  className="font-semibold text-gray-700 hover:text-gray-800 cursor-pointer"
                >
                  Register Now
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* Logo and Tagline Section */}
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="text-center">
          <img className="mx-auto h-60 w-auto" src={logo} alt="Summasphere logo" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Welcome to Summasphere
          </h2>
          <p className="text-sm text-blue-200">
            "Where the research begins"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
