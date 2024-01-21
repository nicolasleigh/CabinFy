import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './useSignup';
import FormRowVertical from '../../ui/FormRowVertical';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonLink from '../../ui/ButtonLink';

// Email regex: /\S+@\S+\.\S+/
const passwordLength = import.meta.env.VITE_PASS_LENGTH;

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { state } = useLocation();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function onSubmit({ username, email, password }) {
    signup(
      { username, email, password },
      {
        onSettled: () => {
          queryClient.invalidateQueries(['user']);
          navigate('/');
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label='Full name' error={errors?.username?.message}>
        <Input
          type='text'
          id='username'
          disabled={isLoading}
          {...register('username', { required: 'This field is required' })}
        />
      </FormRowVertical>

      <FormRowVertical label='Email address' error={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isLoading}
          defaultValue={state?.email || ''}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label={`Password (min ${passwordLength} characters)`}
        error={errors?.password?.message}
      >
        <Input
          type='password'
          id='password'
          disabled={isLoading}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: passwordLength,
              message: `Password needs a minimum of ${passwordLength} characters`,
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRowVertical>
      <ButtonLink to='/login'>log in</ButtonLink>
    </Form>
  );
}

export default SignupForm;
