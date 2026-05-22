import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <MainLayout>

      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <DashboardCard
          title="Total Revenue"
          value="₹45,000"
        />

        <DashboardCard
          title="Products"
          value="120"
        />

        <DashboardCard
          title="AI Suggestions"
          value="18"
        />

      </div>

    </MainLayout>
  );
}

export default Dashboard;