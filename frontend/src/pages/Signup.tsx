import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";
import { LoginLayout } from "../ui/LoginLayout";

function Signup() {
  return (
    <div className='max-w-[400px] mx-auto mt-10'>
      <Logo large />

      <SignupForm />
    </div>
  );
}

export default Signup;
