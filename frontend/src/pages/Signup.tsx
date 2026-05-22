function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Signup
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
          />

          <button
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Signup
          </button>

        </div>

      </div>

    </div>
  );
}

export default Signup;