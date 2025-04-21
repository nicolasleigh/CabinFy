import { useTranslation } from "react-i18next";
import Filter from "../../ui/Filter";

function DashboardFilter() {
  const { t } = useTranslation();
  return (
    <Filter
      filterField='last'
      options={[
        { value: "7", label: t("lastNumDays", { num: "7" }) },
        { value: "30", label: t("lastNumDays", { num: "30" }) },
        { value: "90", label: t("lastNumDays", { num: "90" }) },
      ]}
    />
  );
}

export default DashboardFilter;
