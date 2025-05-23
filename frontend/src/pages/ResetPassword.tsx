import { useTranslation } from "react-i18next";
import ResetPassForm from "../features/authentication/ResetPassForm";
import Logo from "../ui/Logo";

export default function ResetPassword() {
  const { t } = useTranslation();
  return (
    <div className='max-w-[400px] mx-auto mt-40'>
      <Logo />
      <h2 className='text-2xl font-semibold mb-5 text-center'>{t("enterNewPassword")}</h2>
      <ResetPassForm />
    </div>
  );
}
