import styled from 'styled-components';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';
import ResetPassForm from '../features/authentication/ResetPassForm';
import ForgetPassForm from '../features/authentication/ForgetPassForm';
import { LoginLayout } from '../ui/LoginLayout';

export default function ForgetPassword() {
  return (
    <LoginLayout>
      <Logo medium />
      {/* <Heading as='h4'>Enter your email</Heading> */}
      <ForgetPassForm />
    </LoginLayout>
  );
}
