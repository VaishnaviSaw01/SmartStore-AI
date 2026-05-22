import { useLocation } from "react-router-dom";

const pageMeta: Record<string, { title: string; desc: string }> = {
  "/": { title: "Dashboard", desc: "Welcome back — here's what's happening." },
  "/products": { title: "Products", desc: "Manage your product catalogue." },
  "/analytics": { title: "Analytics", desc: "Track performance and trends." },
  "/ai-insights": { title: "AI Insights", desc: "Smart recommendations powered by AI." },
};

function Navbar() {
  const location = useLocation();
  const meta = pageMeta[location.pathname] ?? pageMeta["/"];

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between mb-8">
      {/* Page Title */}
      <div>
        <h1
          style={{ fontFamily: "'Sora', sans-serif" }}
          className="text-2xl font-bold text-slate-900 leading-tight"
        >
          {meta.title}
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">{meta.desc}</p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Date badge */}
        <div className="hidden md:flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 shadow-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {today}
        </div>

        {/* Notification Bell */}
        <button className="relative w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:shadow-sm transition-all duration-200">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white" />
        </button>

        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm cursor-pointer"
          style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
        >
          A
        </div>
      </div>
    </div>
  );
}

export default Navbar;
