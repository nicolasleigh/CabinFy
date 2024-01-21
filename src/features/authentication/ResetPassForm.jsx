import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import { useResetPass } from './useResetPass';

const passwordLength = import.meta.env.VITE_PASS_LENGTH;

function ResetPassForm() {
  const { uid, token } = useParams();

  const { resetPass, isLoading } = useResetPass();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function onSubmit({ password }) {
    resetPass(
      { uid, token, password },
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

      <FormRowVertical
        label='Repeat password'
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type='password'
          id='passwordConfirm'
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button disabled={isLoading}>Submit</Button>
      </FormRowVertical>
    </Form>
  );
}

export default ResetPassForm;
