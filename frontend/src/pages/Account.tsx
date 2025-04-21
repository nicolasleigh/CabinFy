import { useTranslation } from "react-i18next";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
  const { t } = useTranslation();
  return (
    <>
      <h1 className='text-xl font-semibold mb-5'>{t("updateYourAccount")}</h1>

      <div className='mb-5'>
        <h3 className=' mb-2 font-semibold'>{t("updateUserData")}</h3>
        <UpdateUserDataForm />
      </div>

      <div className='mb-5'>
        <h3 className=' mb-2 font-semibold'>{t("updatePassword")}</h3>
        <UpdatePasswordForm />
      </div>
    </>
  );
}

export default Account;
