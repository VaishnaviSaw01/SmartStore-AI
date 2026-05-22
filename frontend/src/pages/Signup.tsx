import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = async () => {

    try {

      await API.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(
        "Account created successfully"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Signup failed");
    }
  };

  return (

    <div className="min-h-screen bg-[#f8fafc] flex">

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-violet-600 to-indigo-700 text-white flex-col justify-center px-20">

        <h1 className="text-6xl font-extrabold leading-tight mb-6">
          Join SmartStore AI
        </h1>

        <p className="text-xl text-indigo-100 leading-9 max-w-xl">
          Build smarter ecommerce experiences using AI-driven analytics, automation, and intelligent inventory systems.
        </p>

        <div className="mt-12 bg-white/10 backdrop-blur-xl rounded-3xl p-8">

          <h3 className="text-2xl font-bold mb-4">
            Platform Features
          </h3>

          <ul className="space-y-3 text-indigo-100">

            <li>
              • AI Product Content Generation
            </li>

            <li>
              • Smart Inventory Analytics
            </li>

            <li>
              • Ecommerce Revenue Insights
            </li>

            <li>
              • AI Pricing Recommendations
            </li>

          </ul>

        </div>

      </div>

      <div className="flex-1 flex items-center justify-center px-6">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-10">

          <div className="mb-8 text-center">

            <h2 className="text-4xl font-bold text-slate-800 mb-3">
              Create Account
            </h2>

            <p className="text-slate-500">
              Start using SmartStore AI today
            </p>

          </div>

          <div className="space-y-5">

            <div>

              <label className="block mb-2 text-sm font-medium text-slate-600">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Vaishnavi Saw"
                className="w-full border border-slate-200 rounded-xl px-4 py-4 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>

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
              onClick={handleSignup}
              className="w-full bg-indigo-700 hover:bg-indigo-800 transition text-white py-4 rounded-xl font-semibold shadow-lg"
            >

              Create Account

            </button>

          </div>

          <p className="text-center text-slate-500 mt-8">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-indigo-700 font-semibold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Signup;