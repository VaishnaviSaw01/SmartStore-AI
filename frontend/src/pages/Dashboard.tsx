import MainLayout from "../layouts/MainLayout";

import Navbar from "../components/Navbar";

import DashboardCard from "../components/DashboardCard";

function Dashboard() {

  return (

    <MainLayout>

      <Navbar />

      <main className="p-10">

        <div className="mb-10">

          <h2 className="text-4xl font-bold text-slate-800 mb-2">
            Executive Overview
          </h2>

          <p className="text-slate-500">
            Real-time ecommerce intelligence dashboard
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <DashboardCard
            title="Total Revenue"
            value="₹12.4L"
            growth="+12.4%"
          />

          <DashboardCard
            title="Products"
            value="248"
            growth="+5%"
          />

          <DashboardCard
            title="AI Insights"
            value="32"
            growth="+18%"
          />

        </div>

        <div className="grid grid-cols-12 gap-6">

          <div className="col-span-8 bg-white rounded-2xl border border-slate-200 p-8">

            <div className="flex justify-between items-center mb-8">

              <div>
                <h3 className="text-2xl font-bold text-slate-800">
                  Revenue Analytics
                </h3>

                <p className="text-slate-500">
                  Weekly sales performance
                </p>
              </div>

            </div>

            <div className="h-[300px] flex items-end gap-4">

              {[40, 65, 55, 80, 45, 90, 70].map((h, i) => (

                <div
                  key={i}
                  className="flex-1 bg-indigo-600 rounded-t-xl"
                  style={{
                    height: `${h}%`,
                  }}
                ></div>

              ))}

            </div>

          </div>

          <div className="col-span-4 space-y-6">

            <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white p-7 rounded-2xl shadow-xl">

              <h3 className="text-2xl font-bold mb-4">
                AI Price Engine
              </h3>

              <p className="text-indigo-100 mb-6 leading-7">
                AI suggests increasing electronics pricing by 5% for higher quarterly margins.
              </p>

              <button className="w-full bg-white text-indigo-700 py-3 rounded-xl font-semibold">
                Apply Optimization
              </button>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-7">

              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Stock Alert
              </h3>

              <div className="space-y-3">

                <div className="flex justify-between bg-red-50 p-3 rounded-xl">
                  <span>Wireless Headphones</span>
                  <span className="text-red-600 font-semibold">
                    4 left
                  </span>
                </div>

                <div className="flex justify-between bg-red-50 p-3 rounded-xl">
                  <span>Smart Watch</span>
                  <span className="text-red-600 font-semibold">
                    2 left
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </MainLayout>

  );
}

export default Dashboard;