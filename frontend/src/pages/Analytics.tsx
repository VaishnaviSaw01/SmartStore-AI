import MainLayout from "../layouts/MainLayout";

import Navbar from "../components/Navbar";

function Analytics() {

  const stats = [
    {
      title: "Monthly Revenue",
      value: "₹4.2L",
      growth: "+18%",
    },

    {
      title: "Conversion Rate",
      value: "12.8%",
      growth: "+5%",
    },

    {
      title: "Customer Growth",
      value: "1,248",
      growth: "+21%",
    },
  ];

  return (

    <MainLayout>

      <Navbar />

      <main className="p-10">

        <div className="mb-10">

          <h2 className="text-4xl font-bold text-slate-800 mb-2">
            Sales Analytics
          </h2>

          <p className="text-slate-500">
            AI-powered ecommerce business intelligence
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {stats.map((stat, index) => (

            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all"
            >

              <div className="flex justify-between items-start mb-5">

                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 text-xl">
                  📈
                </div>

                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                  {stat.growth}
                </span>

              </div>

              <p className="text-sm text-slate-500 uppercase mb-2">
                {stat.title}
              </p>

              <h3 className="text-4xl font-bold text-slate-800">
                {stat.value}
              </h3>

            </div>

          ))}

        </div>

        <div className="grid grid-cols-12 gap-8">

          <div className="col-span-8 bg-white border border-slate-200 rounded-2xl p-8">

            <div className="flex justify-between items-center mb-8">

              <div>

                <h3 className="text-2xl font-bold text-slate-800">
                  Revenue Performance
                </h3>

                <p className="text-slate-500">
                  AI analyzed sales data
                </p>

              </div>

              <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
                Live Analytics
              </div>

            </div>

            <div className="h-[320px] flex items-end gap-5">

              {[45, 70, 55, 90, 65, 85, 78].map((h, i) => (

                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-indigo-700 to-violet-500 rounded-t-2xl"
                  style={{
                    height: `${h}%`,
                  }}
                ></div>

              ))}

            </div>

            <div className="flex justify-between mt-5 text-sm text-slate-500">

              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>

            </div>

          </div>

          <div className="col-span-4 space-y-6">

            <div className="bg-gradient-to-r from-indigo-700 to-violet-600 rounded-2xl p-7 text-white shadow-xl">

              <h3 className="text-2xl font-bold mb-4">
                AI Recommendation
              </h3>

              <p className="text-indigo-100 leading-7 mb-6">
                SmartStore AI predicts a 24% increase in electronics demand next month.
              </p>

              <button className="w-full bg-white text-indigo-700 py-3 rounded-xl font-semibold">
                View AI Report
              </button>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-7">

              <h3 className="text-xl font-bold text-slate-800 mb-5">
                Trending Categories
              </h3>

              <div className="space-y-4">

                <div>

                  <div className="flex justify-between mb-2">

                    <span className="text-sm text-slate-600">
                      Electronics
                    </span>

                    <span className="text-sm font-semibold">
                      82%
                    </span>

                  </div>

                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">

                    <div className="bg-indigo-700 h-full w-[82%]"></div>

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-2">

                    <span className="text-sm text-slate-600">
                      Accessories
                    </span>

                    <span className="text-sm font-semibold">
                      64%
                    </span>

                  </div>

                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">

                    <div className="bg-violet-500 h-full w-[64%]"></div>

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-2">

                    <span className="text-sm text-slate-600">
                      Smart Devices
                    </span>

                    <span className="text-sm font-semibold">
                      71%
                    </span>

                  </div>

                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">

                    <div className="bg-pink-500 h-full w-[71%]"></div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </MainLayout>

  );
}

export default Analytics;