import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';
import { LoginLayout } from '../ui/LoginLayout';

function Login() {
  return (
    <LoginLayout>
      <Logo large />
      <Heading as='h4'>Log in as administrator</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
