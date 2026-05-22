import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import { useAuth } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    try {

      const response =
        await API.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      login(
        response.data.token,
        response.data.user
      );

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Invalid credentials");
    }
  };

  return (

    <div className="min-h-screen bg-[#f8fafc] flex">

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-700 to-violet-600 text-white flex-col justify-center px-20">

        <h1 className="text-6xl font-extrabold leading-tight mb-6">
          SmartStore AI
        </h1>

        <p className="text-xl text-indigo-100 leading-9 max-w-xl">
          AI-powered ecommerce intelligence platform for smarter inventory, analytics, and automated content generation.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-6">

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">

            <h3 className="text-3xl font-bold mb-2">
              248+
            </h3>

            <p className="text-indigo-100">
              Active Products
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">

            <h3 className="text-3xl font-bold mb-2">
              32 AI
            </h3>

            <p className="text-indigo-100">
              Smart Insights
            </p>

          </div>

        </div>

      </div>

      <div className="flex-1 flex items-center justify-center px-6">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-10">

          <div className="mb-8 text-center">

            <h2 className="text-4xl font-bold text-slate-800 mb-3">
              Welcome Back
            </h2>

            <p className="text-slate-500">
              Login to continue to SmartStore AI
            </p>

          </div>

          <div className="space-y-5">

            <div>

              <label className="block mb-2 text-sm font-medium text-slate-600">
                Email Address
              </label>

              <input
                type="email"
                placeholder="admin@smartstore.ai"
                className="w-full border border-slate-200 rounded-xl px-4 py-4 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-medium text-slate-600">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-xl px-4 py-4 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-indigo-700 hover:bg-indigo-800 transition text-white py-4 rounded-xl font-semibold shadow-lg"
            >

              Login to Dashboard

            </button>

          </div>

          <p className="text-center text-slate-500 mt-8">

            Don’t have an account?{" "}

            <Link
              to="/signup"
              className="text-indigo-700 font-semibold"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Login;