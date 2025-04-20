import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import { LoginLayout } from "../ui/LoginLayout";
import Logo from "../ui/Logo";

function Login() {
  return (
    <div className='max-w-[400px] mx-auto mt-10'>
      <Logo large />
      {/* <h2 className='text-2xl font-semibold mb-5 text-center'>
        <span className='bg-cRed-100 text-cRed-500 px-1 rounded-sm'>Admin</span> Login
      </h2> */}
      <LoginForm />
    </div>
  );
}

export default Login;
