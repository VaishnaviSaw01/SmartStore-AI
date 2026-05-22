import { Link, useLocation } from "react-router-dom";

import {
  FiHome,
  FiBox,
  FiBarChart2,
  FiCpu,
  FiSettings,
} from "react-icons/fi";

function Sidebar() {

  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FiHome />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <FiBox />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FiBarChart2 />,
    },
    {
      name: "AI Insights",
      path: "/ai-insights",
      icon: <FiCpu />,
    },
  ];

  return (
    <aside className="w-[280px] h-screen fixed left-0 top-0 flex flex-col py-4 bg-white border-r border-slate-200 z-20">

      <div className="px-6 mb-10 flex items-center gap-3">

        <div className="w-10 h-10 bg-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          S
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            SmartStore AI
          </h1>

          <p className="text-xs text-slate-500">
            Retail Intelligence
          </p>
        </div>

      </div>

      <nav className="flex-1 space-y-1">

        {navItems.map((item) => (

          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-6 py-4 transition-all border-l-4 ${
              location.pathname === item.path
                ? "border-indigo-700 bg-indigo-50 text-indigo-700 font-semibold"
                : "border-transparent text-slate-500 hover:bg-slate-100"
            }`}
          >

            <span className="mr-4 text-lg">
              {item.icon}
            </span>

            {item.name}

          </Link>

        ))}

      </nav>

      <div className="px-6 py-4 mt-auto">

        <div className="p-5 bg-indigo-700 rounded-2xl text-white">

          <p className="text-xs uppercase mb-2 opacity-80">
            Plan Details
          </p>

          <h3 className="text-xl font-bold mb-3">
            Enterprise AI
          </h3>

          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div className="bg-white w-[85%] h-full"></div>
          </div>

          <p className="text-xs mt-2 opacity-70">
            85% monthly AI usage
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;