import MainLayout from "../layouts/MainLayout";

import Navbar from "../components/Navbar";

import DashboardCard from
  "../components/DashboardCard";

function Dashboard() {

  return (

    <MainLayout>

      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <DashboardCard
          title="Revenue"
          value="₹1.2L"
        />

        <DashboardCard
          title="Products"
          value="248"
        />

        <DashboardCard
          title="AI Insights"
          value="32"
        />

      </div>

      <div className="mt-10 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

        <h2 className="text-2xl font-bold mb-4">
          Smart AI Insights
        </h2>

        <p className="text-gray-600 text-lg">
          AI recommends increasing stock
          for wireless accessories due to
          rising sales trends.
        </p>

      </div>

    </MainLayout>
  );
}

export default Dashboard;