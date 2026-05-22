import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-black text-white min-h-screen p-5">

      <h1 className="text-3xl font-bold mb-10 text-blue-400">
        SmartStore AI
      </h1>

      <nav className="flex flex-col gap-5 text-lg">

        <Link
  to="/"
  className="hover:text-blue-400 transition"
>
  Dashboard
</Link>

        <Link
  to="/products"
  className="hover:text-blue-400 transition"
>
  Products
</Link>

        <Link
  to="/analytics"
  className="hover:text-blue-400 transition"
>
  Analytics
</Link>

        <Link
  to="/ai-insights"
  className="hover:text-blue-400 transition"
>
  AI Insights
</Link>

      </nav>

    </div>
  );
}

export default Sidebar;