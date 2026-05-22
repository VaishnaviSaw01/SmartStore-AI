/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import { Skeleton } from "../components/Loader";
import API from "../services/api";

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/>
    <path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75z"/>
  </svg>
);

const TrendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);

const TagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case "TagIcon":
      return <TagIcon />;
    case "TrendIcon":
      return <TrendIcon />;
    case "AlertIcon":
      return <AlertIcon />;
    case "UsersIcon":
      return <UsersIcon />;
    default:
      return <SparklesIcon />;
  }
};

function AIInsights() {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    insightsCount: 0,
    actionsTaken: 0,
    revenueImpact: "₹0",
  });
  
  const [activeFilter, setActiveFilter] = useState("All");

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const response = await API.get("/ai/insights");
      setInsights(response.data.insights || []);
      setSummary(response.data.summary || {
        insightsCount: 0,
        actionsTaken: 0,
        revenueImpact: "₹0",
      });
    } catch (err) {
      console.error("Fetch insights error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
  };

  // Filter insights list locally
  const filteredInsights = insights.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Inventory") return item.label === "Inventory Alert";
    if (activeFilter === "Sales") return item.label === "Sales Insight" || item.label === "Pricing Adjustment";
    if (activeFilter === "SEO") return item.label === "SEO Alert" || item.label === "Product Optimisation";
    if (activeFilter === "Customers") return item.label === "Customer Insight";
    return true;
  });

  const summaryStats = [
    { label: "Insights Generated", value: summary.insightsCount.toString(), sub: "Real-time audit" },
    { label: "Recommended Actions", value: summary.actionsTaken.toString(), sub: "Estimated actions" },
    { label: "Revenue Impact (Est.)", value: summary.revenueImpact, sub: "Calculated lift" },
  ];

  return (
    <MainLayout>
      <Navbar />

      {/* Summary banner */}
      <div
        className="rounded-2xl p-8 mb-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }}
      >
        <div
          className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #fff, transparent)" }}
        />
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-2.5">
            <SparklesIcon />
            <span className="text-indigo-200 text-xs font-bold uppercase tracking-wider">AI Copilot Engine</span>
          </div>
          <h2
            style={{ fontFamily: "'Sora', sans-serif" }}
            className="text-white text-xl font-bold mb-1"
          >
            Gemini Store Auditor Active
          </h2>
          <p className="text-indigo-200 text-xs leading-relaxed">
            We scan your live catalog price ratios, stock limits, and descriptions to compute optimization directives.
          </p>
        </div>
        <div className="flex gap-6 lg:gap-10 relative z-10 w-full lg:w-auto justify-between lg:justify-end border-t border-white/10 lg:border-none pt-4 lg:pt-0">
          {summaryStats.map((s) => (
            <div key={s.label} className="text-center lg:text-right">
              <p
                style={{ fontFamily: "'Sora', sans-serif" }}
                className="text-white text-2xl font-bold"
              >
                {loading ? "..." : s.value}
              </p>
              <p className="text-indigo-200 text-[10px] font-semibold uppercase tracking-wider mt-1">{s.label}</p>
              <p className="text-indigo-300 text-[10px] mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        {["All", "Inventory", "Sales", "SEO", "Customers"].map((f) => (
          <button
            key={f}
            onClick={() => handleFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeFilter === f
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/10"
                : "bg-white border border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Insight Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
        </div>
      ) : filteredInsights.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
            <SparklesIcon />
          </div>
          <h4 style={{ fontFamily: "'Sora', sans-serif" }} className="text-slate-800 font-bold text-sm">No Filter Matches</h4>
          <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
            There are no active AI insights matching the category "{activeFilter}". Select "All" or add more items to compute alerts.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredInsights.map((insight, idx) => (
            <div
              key={insight.title + idx}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: insight.bgColor, color: insight.labelColor }}
                    >
                      {renderIcon(insight.icon)}
                    </div>
                    <div>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-lg inline-block mb-1"
                        style={{ background: insight.bgColor, color: insight.labelColor }}
                      >
                        {insight.label}
                      </span>
                      <h3
                        style={{ fontFamily: "'Sora', sans-serif" }}
                        className="text-slate-900 font-bold text-base leading-tight"
                      >
                        {insight.title}
                      </h3>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg flex-shrink-0 ml-2 ${insight.priorityColor}`}>
                    {insight.priority}
                  </span>
                </div>

                {/* Body */}
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {insight.desc}
                </p>
              </div>

              {/* Action Footer */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-50 mt-auto">
                <button
                  onClick={() => alert("Action applied! Recommendation parameters submitted to store catalog.")}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Apply Recommendation <ArrowIcon />
                </button>
                <button 
                  onClick={() => setInsights(prev => prev.filter((_, i) => i !== idx))}
                  className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 transition-colors ml-auto"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default AIInsights;
