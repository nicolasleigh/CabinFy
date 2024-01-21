import styled from 'styled-components';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';
import Cookies from 'js-cookie';
import SignupForm from '../features/authentication/SignupForm';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Signup() {
  const token = Cookies.get('userUid');
  console.log(token);
  return (
    <LoginLayout>
      <Logo />
      <Heading as='h4'>Sign up</Heading>
      <SignupForm />
    </LoginLayout>
  );
}

export default Signup;
