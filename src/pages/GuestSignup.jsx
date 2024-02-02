import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useSignup } from '../features/guests/useSignup';
import { useSignupModal } from '../hooks';
import { useOutsideClick } from '../hooks/useOutsideClick';
import Button from '../ui/Button';
import Form from '../ui/Form';
import FormRowVertical from '../ui/FormRowVertical';
import Input from '../ui/Input';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: brightness(60%);
  z-index: 2000;
  transition: all 0.5s;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const passwordLength = import.meta.env.VITE_PASS_LENGTH;

export default function GuestSignup() {
  const { isOpen, setIsOpen } = useSignupModal();
  const { signup, isLoading } = useSignup();

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();
  const ref = useOutsideClick(() => setIsOpen(false));

  const onSubmit = ({ fullName, email, password }) => {
    signup(
      { fullName, email, password },
      {
        onSuccess: () => {
          setIsOpen(false);
          reset();
        },
      }
    );
  };
  if (!isOpen) return null;
  return (
    <Overlay>
      <StyledModal ref={ref}>
        <Form type='modal-small' onSubmit={handleSubmit(onSubmit)}>
          <FormRowVertical label='Full name' error={errors?.fullName?.message}>
            <Input
              id='fullName'
              {...register('fullName', { required: 'This field is required' })}
            />
          </FormRowVertical>

          <FormRowVertical label='Email' error={errors?.email?.message}>
            <Input
              id='email'
              {...register('email', { required: 'This field is required' })}
            />
          </FormRowVertical>

          <FormRowVertical label='Password' error={errors?.password?.message}>
            <Input
              id='password'
              type='password'
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: passwordLength,
                  message: `at least ${passwordLength} characters`,
                },
              })}
            />
          </FormRowVertical>

          <FormRowVertical
            label='Repeat password'
            error={errors?.repeatPassword?.message}
          >
            <Input
              id='repeat password'
              type='password'
              {...register('repeatPassword', {
                required: 'This field is required',
                validate: (value) =>
                  value === getValues().password || `Passwords doesn't match`,
              })}
            />
          </FormRowVertical>
          <FormRowVertical>
            <Button variation='gradient'>Sign up</Button>
          </FormRowVertical>
        </Form>
      </StyledModal>
    </Overlay>
  );
}
