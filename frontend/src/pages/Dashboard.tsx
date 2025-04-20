import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";

function Dashboard() {
  return (
    <>
      <div className='flex justify-between mb-4 max-sm:flex-col max-sm:gap-3'>
        <h1 className='text-xl font-semibold '>Dashboard</h1>
        <DashboardFilter />
      </div>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
