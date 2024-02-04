import { useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import { useLogin } from './useLogin';
import SpinnerMini from '../../ui/SpinnerMini';
import ButtonLink from '../../ui/ButtonLink';
import ButtonGroup from '../../ui/ButtonGroup';
import styled from 'styled-components';

const BackLink = styled(ButtonLink)`
  margin-top: 1rem;
  display: inline-block;
`;

function LoginForm() {
  const [email, setEmail] = useState('nicolas.leigh@qq.com');
  const [password, setPassword] = useState('1234');
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        // onSettled: () => {
        //   setEmail('');
        //   setPassword('');
        // },
      }
    );
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormRowVertical label='Email address'>
          <Input
            type='email'
            id='email'
            // This makes this form better for password managers
            autoComplete='username'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        <FormRowVertical label='Password'>
          <Input
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button size='large' disabled={isLoading}>
            {!isLoading ? 'Login' : <SpinnerMini />}
          </Button>
        </FormRowVertical>
        <ButtonGroup $between>
          <ButtonLink to='/admin/signup' state={{ email }}>
            Sign up
          </ButtonLink>
          <ButtonLink to='/admin/forget-password' state={{ email }}>
            Forget password?
          </ButtonLink>
        </ButtonGroup>
        <BackLink to='/home'>Back to guest page</BackLink>
      </Form>
    </>
  );
}

export default LoginForm;
