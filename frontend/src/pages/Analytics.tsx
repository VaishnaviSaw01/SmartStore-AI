/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import { Skeleton } from "../components/Loader";
import API from "../services/api";

// Import ChartJS elements
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

// Register elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const response = await API.get("/analytics");
        setAnalyticsData(response.data);
      } catch (err) {
        console.error("Failed to load analytics metrics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Set up chart data and configuration
  const barChartData = {
    labels: analyticsData?.chartData?.months || ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (₹)",
        data: analyticsData?.chartData?.revenueValues || [45000, 62000, 55000, 78000, 88000, 72000],
        backgroundColor: "rgba(99, 102, 241, 0.85)",
        hoverBackgroundColor: "rgba(99, 102, 241, 1)",
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 12,
        titleFont: { family: "Sora", size: 13 },
        bodyFont: { family: "DM Sans", size: 12 },
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#94a3b8",
          font: { family: "DM Sans", size: 11 },
        },
      },
      y: {
        grid: {
          color: "#f1f5f9",
        },
        ticks: {
          color: "#94a3b8",
          font: { family: "DM Sans", size: 11 },
          callback: (value: any) => "₹" + (value >= 1000 ? value / 1000 + "k" : value),
        },
      },
    },
  };

  const categories = analyticsData?.categoryDistribution || [];
  const doughnutChartData = {
    labels: categories.map((c: any) => c.source),
    datasets: [
      {
        data: categories.map((c: any) => c.pct),
        backgroundColor: ["#6366f1", "#10b981", "#f59e0b", "#ec4899"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 10,
          padding: 15,
          color: "#475569",
          font: { family: "DM Sans", size: 11, weight: "bold" as const },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => ` ${context.label}: ${context.raw}% of products`,
        },
        backgroundColor: "#0f172a",
        cornerRadius: 8,
        padding: 10,
      },
    },
  };

  // Static fallback metadata cards to show if analytics isn't finished loading
  const stats = [
    {
      label: "Estimated Revenue",
      value: analyticsData?.metrics?.totalRevenue || "₹120K",
      change: "+14%",
      positive: true,
      color: "#6366f1",
    },
    {
      label: "Products Tracked",
      value: analyticsData?.metrics?.totalProducts?.toString() || "0",
      change: `${analyticsData?.metrics?.lowStockCount || 0} low stock`,
      positive: (analyticsData?.metrics?.lowStockCount || 0) === 0,
      color: "#10b981",
    },
    {
      label: "Low Stock Alert",
      value: analyticsData?.metrics?.lowStockCount?.toString() || "0",
      change: "Items warning",
      positive: (analyticsData?.metrics?.lowStockCount || 0) === 0,
      color: "#f59e0b",
    },
    {
      label: "AI Advice Count",
      value: analyticsData?.metrics?.insightsCount?.toString() || "32",
      change: "Gemini active",
      positive: true,
      color: "#ec4899",
    },
  ];

  const topProducts = analyticsData?.topProducts || [];

  return (
    <MainLayout>
      <Navbar />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {loading ? (
          <>
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </>
        ) : (
          stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: s.color }}
              />
              <p className="text-slate-500 text-xs font-semibold mb-4">{s.label}</p>
              <p
                style={{ fontFamily: "'Sora', sans-serif" }}
                className="text-2xl font-bold text-slate-900 mb-2"
              >
                {s.value}
              </p>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-lg inline-block ${
                  s.positive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                }`}
              >
                {s.change}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Bar Chart - 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3
                style={{ fontFamily: "'Sora', sans-serif" }}
                className="font-bold text-slate-900 text-base"
              >
                Store Revenue Performance
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">Calculated over product catalog baseline sales</p>
            </div>
          </div>

          <div className="h-64 relative">
            {loading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <Bar data={barChartData} options={barChartOptions} />
            )}
          </div>
        </div>

        {/* Category Distribution - 1 col */}
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h3
            style={{ fontFamily: "'Sora', sans-serif" }}
            className="font-bold text-slate-900 text-base mb-6"
          >
            Category Distribution
          </h3>

          <div className="h-48 relative mb-4">
            {loading ? (
              <Skeleton className="h-full w-full rounded-full" />
            ) : (
              <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
            )}
          </div>

          {!loading && categories.length > 0 && (
            <div className="grid grid-cols-2 gap-2 text-xs pt-2">
              {categories.map((c: any, index: number) => {
                const colors = ["#6366f1", "#10b981", "#f59e0b", "#ec4899"];
                return (
                  <div key={c.source} className="flex items-center gap-1.5 text-slate-600">
                    <span 
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    <span className="truncate">{c.source} ({c.pct}%)</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50">
          <h3
            style={{ fontFamily: "'Sora', sans-serif" }}
            className="font-bold text-slate-900 text-base"
          >
            Estimated Top Selling Products
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">Ranked by estimated product value sales velocity</p>
        </div>
        
        {loading ? (
          <div className="p-8 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {topProducts.map((p: any, i: number) => (
              <div key={p.name} className="flex items-center gap-5 px-8 py-5 hover:bg-slate-50/60 transition-colors">
                <span
                  style={{ fontFamily: "'Sora', sans-serif" }}
                  className="text-xs font-bold text-slate-400 w-5 text-center"
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 text-sm font-semibold truncate">{p.name}</p>
                  <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full w-full max-w-xs overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${p.pct}%`,
                        background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                      }}
                    />
                  </div>
                </div>
                <span className="text-slate-500 text-xs w-16 text-right font-medium">{p.sales} sold</span>
                <span
                  style={{ fontFamily: "'Sora', sans-serif" }}
                  className="text-slate-900 text-sm font-bold w-28 text-right"
                >
                  {p.revenue}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Analytics;
