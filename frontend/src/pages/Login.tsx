import { useState } from "react";

import { useNavigate } from
  "react-router-dom";

import API from "../services/api";

import { useAuth } from
  "../context/AuthContext";

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

      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;