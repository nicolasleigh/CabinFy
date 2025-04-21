import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import { LoginLayout } from "../ui/LoginLayout";
import Logo from "../ui/Logo";

function Login() {
  return (
    <div className='max-w-[400px] mx-auto mt-10'>
      <Logo large />
      <LoginForm />
    </div>
  );
}

export default Login;
