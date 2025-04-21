import { useTranslation } from "react-i18next";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";

function Dashboard() {
  const { t } = useTranslation();
  return (
    <>
      <div className='flex justify-between mb-4 max-sm:flex-col max-sm:gap-3'>
        <h1 className='text-xl font-semibold'>{t("dashboardHeader")}</h1>
        <DashboardFilter />
      </div>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
