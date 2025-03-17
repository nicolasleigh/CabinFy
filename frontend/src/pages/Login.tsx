import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import { LoginLayout } from "../ui/LoginLayout";
import Logo from "../ui/Logo";

function Login() {
  return (
    <div className='max-w-[400px] mx-auto mt-10'>
      <Logo $large />
      <h2 className='text-2xl font-semibold mb-5'>Log in as Admin</h2>
      <LoginForm />
    </div>
  );
}

export default Login;
