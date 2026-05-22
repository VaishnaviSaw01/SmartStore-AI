import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/>
    <path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "#f8fafc" }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full -translate-y-1/2 -translate-x-1/2 opacity-25"
        style={{ background: "radial-gradient(circle, #c7d2fe, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full translate-y-1/2 translate-x-1/2 opacity-20"
        style={{ background: "radial-gradient(circle, #ddd6fe, transparent)" }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Brand mark */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            <SparklesIcon />
          </div>
          <span
            style={{ fontFamily: "'Sora', sans-serif" }}
            className="text-slate-900 text-2xl font-bold"
          >
            StoreIQ
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 p-8 border border-slate-100">
          <div className="mb-7">
            <h1
              style={{ fontFamily: "'Sora', sans-serif" }}
              className="text-2xl font-bold text-slate-900"
            >
              Create your account
            </h1>
            <p className="text-slate-400 text-sm mt-1">Get started with StoreIQ today</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="text-slate-600 text-xs font-semibold uppercase tracking-wide mb-2 block">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <UserIcon />
                </span>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 bg-slate-50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-slate-600 text-xs font-semibold uppercase tracking-wide mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <MailIcon />
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 bg-slate-50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-600 text-xs font-semibold uppercase tracking-wide mb-2 block">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <LockIcon />
                </span>
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-300 bg-slate-50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white text-sm font-semibold mt-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: loading
                  ? "#a5b4fc"
                  : "linear-gradient(135deg, #6366f1, #7c3aed)",
                boxShadow: loading ? "none" : "0 4px 20px rgba(99,102,241,0.35)",
              }}
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </div>

          {/* Footer */}
          <p className="text-slate-400 text-sm text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
