function Navbar() {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center mb-6">

      <div>
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome to SmartStore AI
        </p>
      </div>

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
          V
        </div>

      </div>

    </div>
  );
}

export default Navbar;