function Navbar() {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center mb-8 border border-gray-100">

      <div>

        <h1 className="text-4xl font-bold text-gray-800">
          SmartStore AI
        </h1>

        <p className="text-gray-500 mt-1">
          AI-powered ecommerce dashboard
        </p>

      </div>

      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
        V
      </div>

    </div>

  );
}

export default Navbar;