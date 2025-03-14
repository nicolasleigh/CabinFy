import LoginForm from '../features/authentication/LoginForm';
import Heading from '../ui/Heading';
import { LoginLayout } from '../ui/LoginLayout';
import Logo from '../ui/Logo';

function Login() {
  return (
    <LoginLayout>
      <Logo $large />
      <Heading as='h4'>Log in as administrator</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
