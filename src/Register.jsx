import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import googleIcon from './assets/googleIcon.png';
import logo from './assets/logo.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const requestBody = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      passwordConfirm: document.getElementById('passwordConfirm').value
    };

    if (!requestBody.email || !requestBody.password || !requestBody.passwordConfirm) {
      toast.error('All fields are required');
      return;
    }

    if (requestBody.password !== requestBody.passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }

    const response = await axios.post(import.meta.env.VITE_REACT_APP_BACKEND_URL + '/api/v1/auth/email/register', requestBody, config).catch((error) => {
      switch (error.response.data.status) {
        case 'error':
          toast.error((error.response.data.message) ? error.response.data.message : (error.response.statusText) ? error.response.statusText : 'An unexpected error occurred');
          break;
        default:
      }
    });

    if (response && (response.status === 204 || (response.data && response.data.success))) {
      toast.success('Registration successful');
      navigate('/login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 to-sky-950">
      {/* Register Form Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <form className="mt-8 space-y-6 bg-white shadow-md rounded-xl px-8 pt-6 pb-8" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              {/* Email Input */}
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-3"
                />
              </div>
              {/* Create Password Input */}
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                  Create Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-3"
                />
              </div>
              {/* Confirm Password Input */}
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input
                  id="passwordConfirm"
                  type="password"
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
            {/* Register Button */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
            <div className="flex items-center justify-center mb-3">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-3 text-center text-sm text-gray-600">or</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            {/* Google Register Button */}
            <div className="flex items-center justify-center mb-6">
              <button
                type="button"
                className="group w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-2xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <img src={googleIcon} alt="Google sign-in" className="h-6 w-6 mr-3" />
                Register with Google
              </button>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Have an account?{' '}
                <Link to="/login" className="font-semibold text-gray-700 hover:text-gray-800 cursor-pointer">
                  Log In Now
                </Link>
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

export default Register;
