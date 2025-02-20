import Logo from '../ui/Logo';
import Heading from '../ui/Heading';
import SignupForm from '../features/authentication/SignupForm';
import { LoginLayout } from '../ui/LoginLayout';

function Signup() {
  return (
    <LoginLayout>
      <Logo $large />
      <Heading as='h4'>Sign up as administrator</Heading>
      <SignupForm />
    </LoginLayout>
  );
}

export default Signup;
