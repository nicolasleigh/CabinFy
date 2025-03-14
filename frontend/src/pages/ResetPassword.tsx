import styled from 'styled-components';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';
import ResetPassForm from '../features/authentication/ResetPassForm';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

export default function ResetPassword() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as='h4'>Enter your new password</Heading>
      <ResetPassForm />
    </LoginLayout>
  );
}
