import styled from 'styled-components';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';
import ResetPassForm from '../features/authentication/ResetPassForm';
import ForgetPassForm from '../features/authentication/ForgetPassForm';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

export default function ForgetPassword() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as='h4'>Enter your email</Heading>
      <ForgetPassForm />
    </LoginLayout>
  );
}
