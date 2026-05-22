function Navbar() {

  return (

    <header className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-10">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          SmartStore AI
        </h1>

        <p className="text-sm text-slate-500">
          AI Powered Ecommerce Platform
        </p>

      </div>

      <div className="flex items-center gap-4">

        <button className="text-slate-500 hover:text-indigo-700 transition">
          🔔
        </button>

        <div className="flex items-center gap-3">

          <div className="text-right">
            <p className="font-semibold text-sm">
              Admin User
            </p>

            <p className="text-xs text-slate-500">
              Super Admin
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-indigo-700 text-white flex items-center justify-center font-bold">
            V
          </div>

        </div>

      </div>

    </header>

  );
}

export default Navbar;