import React, { useState } from "react";
import axios from "../api/axios";
import Background from "../components/Background"; // Import the Background component
// import NavBar from "../components/NavBar";

import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    // Make this function async
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
    } else {
      setError("");
      console.log("Login successful");
    }

    try {
      const response = await axios.post("/login", { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Save token to localStorage
      window.location.href = '/home';
      
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-blue-100 to-gray-100 relative flex justify-center items-center overflow-hidden">
      {/* Background Elements */}
      <Background />

      {/* Login Box */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative z-10 text-left">
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email ID"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-gray-700 text-sm mt-4">
          Don't have an account?{" "}
          <a className="text-blue-500 hover:text-blue-700" href="/register">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
