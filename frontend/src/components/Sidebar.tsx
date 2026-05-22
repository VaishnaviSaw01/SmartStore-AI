import {
  FiHome,
  FiBox,
  FiBarChart2,
  FiCpu,
} from "react-icons/fi";

import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="w-72 bg-[#0f172a] text-white min-h-screen p-8 shadow-2xl">

      <h1 className="text-4xl font-extrabold text-blue-400 mb-14">
        SmartStore
      </h1>

      <nav className="flex flex-col gap-5">

        <Link
          to="/"
          className="flex items-center gap-3 p-4 rounded-2xl hover:bg-blue-500 transition text-lg"
        >
          <FiHome />
          Dashboard
        </Link>

        <Link
          to="/products"
          className="flex items-center gap-3 p-4 rounded-2xl hover:bg-blue-500 transition text-lg"
        >
          <FiBox />
          Products
        </Link>

        <Link
          to="/analytics"
          className="flex items-center gap-3 p-4 rounded-2xl hover:bg-blue-500 transition text-lg"
        >
          <FiBarChart2 />
          Analytics
        </Link>

        <Link
          to="/ai-insights"
          className="flex items-center gap-3 p-4 rounded-2xl hover:bg-blue-500 transition text-lg"
        >
          <FiCpu />
          AI Insights
        </Link>

      </nav>

    </div>

  );
}

export default Sidebar;