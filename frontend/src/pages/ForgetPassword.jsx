import ForgetPassForm from '../features/authentication/ForgetPassForm';
import { LoginLayout } from '../ui/LoginLayout';
import Logo from '../ui/Logo';

export default function ForgetPassword() {
  return (
    <LoginLayout>
      <Logo $medium />
      <ForgetPassForm />
    </LoginLayout>
  );
}
