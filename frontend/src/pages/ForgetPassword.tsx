import ForgetPassForm from "../features/authentication/ForgetPassForm";
import { LoginLayout } from "../ui/LoginLayout";
import Logo from "../ui/Logo";

export default function ForgetPassword() {
  return (
    <div className='max-w-[300px] mx-auto mt-40'>
      <Logo $medium />
      <ForgetPassForm />
    </div>
  );
}
