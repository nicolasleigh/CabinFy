import { useTranslation } from "react-i18next";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  const { t } = useTranslation();
  return (
    <div className='max-w-96 mx-auto border p-5 rounded-md mt-20'>
      <h1 className='text-xl font-medium mb-4'>{t("updateHotelSettingsHeader")}</h1>
      <UpdateSettingsForm />
    </div>
  );
}

export default Settings;
