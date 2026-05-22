import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Inline SVG icons to avoid dependency issues
const Icons = {
  Dashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Package: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  BarChart: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  Sparkles: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/>
      <path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75z"/>
      <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75z"/>
    </svg>
  ),
  Logout: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
};

const navItems = [
  { to: "/", label: "Dashboard", Icon: Icons.Dashboard },
  { to: "/products", label: "Products", Icon: Icons.Package },
  { to: "/analytics", label: "Analytics", Icon: Icons.BarChart },
  { to: "/ai-insights", label: "AI Insights", Icon: Icons.Sparkles },
];

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const { logout, user } = useAuth();
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "A";

  return (
    <>
      {/* Mobile drawer overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <aside
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        className={`w-64 bg-slate-900 flex flex-col transition-transform duration-300 z-50 shadow-2xl fixed md:sticky left-0 top-0 bottom-0 h-screen md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Header */}
        <div className="px-8 py-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
            >
              <Icons.Sparkles />
            </div>
            <div>
              <span
                style={{ fontFamily: "'Sora', sans-serif" }}
                className="text-white font-bold text-lg tracking-tight leading-none"
              >
                StoreIQ
              </span>
              <p className="text-slate-500 text-xs mt-0.5">Admin Panel</p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button 
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-8 flex flex-col gap-2">
          <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-4 mb-4">
            Menu
          </p>
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30"
                    : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"}>
                    <Icon />
                  </span>
                  {label}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Profile / Sign Out Block */}
        <div className="px-5 pb-8 border-t border-white/5 pt-6">
          <div className="flex items-center gap-3 px-3 mb-4">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              {userInitial}
            </div>
            <div className="min-w-0">
              <p className="text-slate-200 text-sm font-semibold truncate">{user?.name || "Admin User"}</p>
              <p className="text-slate-500 text-xs truncate">{user?.email || "admin@storeiq.in"}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 w-full"
          >
            <Icons.Logout />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
