import { useState } from "react";

import { useNavigate } from
  "react-router-dom";

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
        "Signup successful"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Signup
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

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
            onClick={handleSignup}
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Signup
          </button>

        </div>

      </div>

    </div>
  );
}

export default Signup;