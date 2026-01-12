import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, getUserRole } from "../service/authService";

const LoginPage = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      const role = getUserRole(); // Expecting 'ROLE_HR_MANAGER' or 'ROLE_EMPLOYEE'

      // Normalize role string check just in case
      if (role === "ROLE_HR_MANAGER" || role === "HR_MANAGER") {
        navigate("/hr-dashboard");
      } else if (role === "ROLE_EMPLOYEE" || role === "EMPLOYEE") {
        navigate("/my-profile");
      } else {
        setError("Unknown role");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white shadow-2xl rounded-3xl p-10 transform ">
          {/* Avatar */}
          <div className="mx-auto h-20 w-20 rounded-full bg-green-800 flex items-center justify-center shadow-lg font-bold text-slate-100 text-3xl">
            <svg
              className="w-6 h-6 text-slate-100  dark:text-grey-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>

          <div className="mt-2 space-y-4">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900">Welcome Back</h3>
              <p className="text-xs text-gray-600">Please sign in to your account</p>
              <p className="text-sm text-gray-600">
                {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200 hover:shadow-md">
                <label
                  htmlFor="email"
                  className="block text-s font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <div className="flex items-center">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="placeholder-gray-400 text-gray-900 w-full focus:outline-none text-sm bg-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200 hover:shadow-md">
                <label
                  htmlFor="password"
                  className="block text-s font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="flex items-center">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="placeholder-gray-400 text-gray-900 w-full focus:outline-none text-sm bg-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-m font-bold rounded-2xl text-slate-100 bg-green-800 focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none shadow-xl  hover:shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Login
              </button>
              <div className=" px-4 text-sm">
                <p>Demo Credentials: <br/>
                HR: arya.hr@ems.com / hr123 <br/>
                Emp: muskan.emp@ems.com / emp123</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
