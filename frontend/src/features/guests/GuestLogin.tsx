import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useLogin } from './useLogin';
import { useLoginModal } from '../../hooks';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';

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

export default function GuestLogin() {
  const { isOpen, setIsOpen } = useLoginModal();
  const { login, isLoading } = useLogin();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const ref = useOutsideClick(() => setIsOpen(false));

  const onSubmit = ({ email, password }) => {
    login(
      { email, password },
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
          <FormRowVertical label='Email' error={errors?.email?.message}>
            <Input
              id='email'
              defaultValue='test@e.com'
              {...register('email', { required: 'This field is required' })}
            />
          </FormRowVertical>

          <FormRowVertical label='Password' error={errors?.password?.message}>
            <Input
              id='password'
              type='password'
              defaultValue='1234'
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: passwordLength,
                  message: `at least ${passwordLength} characters`,
                },
              })}
            />
          </FormRowVertical>

          <FormRowVertical>
            <Button variation='gradient'>Log in</Button>
          </FormRowVertical>
        </Form>
      </StyledModal>
    </Overlay>
  );
}
