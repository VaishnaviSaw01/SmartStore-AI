import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import { Skeleton } from "../components/Loader";
import API from "../services/api";

const TrendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);

const PackageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const SparklesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/>
    <path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75z"/>
  </svg>
);

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalRevenue: "₹0",
    totalProducts: 0,
    lowStockCount: 0,
    insightsCount: 0,
  });
  
  const [topInsight, setTopInsight] = useState({
    title: "AI E-Commerce Assistant Active",
    desc: "AI is analyzing your store catalog. Click below to check personalized inventory alerts, sales optimizations, and SEO performance tips.",
  });

  const [recentActivities, setRecentActivities] = useState<Array<{ text: string, time: string, dot: string }>>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const statsRes = await API.get("/analytics");
        const { totalRevenue, totalProducts, lowStockCount, insightsCount } = statsRes.data.metrics;
        setMetrics({
          totalRevenue,
          totalProducts,
          lowStockCount,
          insightsCount,
        });

        // Fetch insights to display top recommendation
        const insightsRes = await API.get("/ai/insights");
        if (insightsRes.data.insights && insightsRes.data.insights.length > 0) {
          const firstInsight = insightsRes.data.insights[0];
          setTopInsight({
            title: firstInsight.title,
            desc: firstInsight.desc,
          });
        }
        
        // Build dynamic activities list
        const activities = [];
        if (totalProducts > 0) {
          activities.push({ text: `Catalog successfully loaded with ${totalProducts} active products`, time: "Just now", dot: "bg-emerald-400" });
        }
        if (lowStockCount > 0) {
          activities.push({ text: `AI flagged low stock warnings on ${lowStockCount} items`, time: "5 min ago", dot: "bg-amber-400" });
        } else {
          activities.push({ text: `All product stock levels are stable and healthy`, time: "10 min ago", dot: "bg-indigo-400" });
        }
        activities.push({ text: "Smart StoreIQ dashboard synchronized with Mongoose DB", time: "15 min ago", dot: "bg-emerald-400" });
        activities.push({ text: "Google Gemini semantic analyzer initialized", time: "1 hr ago", dot: "bg-indigo-400" });
        
        setRecentActivities(activities);

      } catch (err) {
        console.error("Dashboard statistics loading failed:", err);
        // Fallbacks
        setRecentActivities([
          { text: "SmartStore AI Backend connection failed", time: "Just now", dot: "bg-red-400" },
          { text: "Using fallback dashboard metrics", time: "1 min ago", dot: "bg-slate-300" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <MainLayout>
      <Navbar />

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {loading ? (
          <>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </>
        ) : (
          <>
            <DashboardCard
              title="Calculated Revenue (Est.)"
              value={metrics.totalRevenue}
              icon={<TrendIcon />}
              change="12%"
              positive={true}
              accent="#6366f1"
            />
            <DashboardCard
              title="Products Catalog"
              value={metrics.totalProducts.toString()}
              icon={<PackageIcon />}
              change={`${metrics.lowStockCount} Low stock`}
              positive={metrics.lowStockCount === 0}
              accent="#10b981"
            />
            <DashboardCard
              title="Dynamic AI Insights"
              value={metrics.insightsCount.toString()}
              icon={<SparklesIcon />}
              change="New insights"
              positive={true}
              accent="#f59e0b"
            />
          </>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* AI Insight Banner — 2 cols */}
        <div
          className="lg:col-span-2 rounded-2xl p-8 md:p-10 text-white relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #6d28d9 100%)",
          }}
        >
          {/* decorative blob */}
          <div
            className="absolute -right-12 -top-12 w-48 h-48 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
          />
          <div
            className="absolute right-20 bottom-0 w-32 h-32 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <SparklesIcon />
              </div>
              <span className="text-indigo-200 text-sm font-medium tracking-wide">
                Smart AI Insight
              </span>
            </div>

            {loading ? (
              <div className="space-y-2 mb-6">
                <div className="h-6 bg-white/20 rounded w-1/2" />
                <div className="h-4 bg-white/20 rounded w-3/4" />
                <div className="h-4 bg-white/20 rounded w-2/3" />
              </div>
            ) : (
              <>
                <h2
                  style={{ fontFamily: "'Sora', sans-serif" }}
                  className="text-2xl font-bold mb-2 leading-snug"
                >
                  {topInsight.title}
                </h2>
                <p className="text-indigo-200 text-sm leading-relaxed mb-6 max-w-xl">
                  {topInsight.desc}
                </p>
              </>
            )}

            <button 
              onClick={() => navigate("/ai-insights")}
              className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-900/20"
            >
              View AI Insights
              <ArrowIcon />
            </button>
          </div>
        </div>

        {/* Quick Stats — 1 col */}
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h3
            style={{ fontFamily: "'Sora', sans-serif" }}
            className="font-semibold text-slate-900 mb-5 text-base"
          >
            Quick Stats
          </h3>
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            ) : (
              [
                { label: "Low Stock Items", value: metrics.lowStockCount.toString(), Icon: CartIcon, color: "#f59e0b" },
                { label: "Active Catalogue", value: `${metrics.totalProducts} items`, Icon: UsersIcon, color: "#10b981" },
                { label: "Analysis Rate", value: "100%", Icon: TrendIcon, color: "#6366f1" },
              ].map(({ label, value, Icon, color }) => (
                <div
                  key={label}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${color}18`, color }}
                    >
                      <Icon />
                    </div>
                    <span className="text-sm text-slate-600 font-medium">{label}</span>
                  </div>
                  <span
                    style={{ fontFamily: "'Sora', sans-serif" }}
                    className="text-sm font-bold text-slate-900"
                  >
                    {value}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity — full width */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3
              style={{ fontFamily: "'Sora', sans-serif" }}
              className="font-semibold text-slate-900 text-base"
            >
              Recent Activity
            </h3>
          </div>
          
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {recentActivities.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-5">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.dot}`} />
                  <p className="text-slate-700 text-sm flex-1">{item.text}</p>
                  <span className="text-slate-400 text-xs whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;
