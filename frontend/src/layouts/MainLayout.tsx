import { useState } from "react";
import Sidebar from "../components/Sidebar";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar - responsive controls passed down */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 min-h-screen">
        
        {/* Mobile Header Bar */}
        <header className="md:hidden flex items-center justify-between px-6 py-4 bg-slate-900 text-white sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
            >
              ✨
            </div>
            <span style={{ fontFamily: "'Sora', sans-serif" }} className="font-bold text-base tracking-tight">
              StoreIQ
            </span>
          </div>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </header>

        {/* Inner Main Area */}
        <main className="p-6 md:p-12 w-full">
          <div className="page-enter">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
