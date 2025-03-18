import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";
import { LoginLayout } from "../ui/LoginLayout";

function Signup() {
  return (
    <div className='max-w-[400px] mx-auto mt-10'>
      <Logo $large />
      <h2 className='text-2xl font-semibold mb-5 text-center'>
        Sign up as <span className='bg-cRed-100 text-cRed-500 px-1 rounded-sm'>Admin</span>
      </h2>
      <SignupForm />
    </div>
  );
}

export default Signup;
