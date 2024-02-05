import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useCreateGuest } from './useCreateGuest';

// With NEW modal
// function CreateGuest({ onSuccessNewGuest, setIsOpenForm }) {
function CreateGuestForm({ onSuccessNewGuest, closeModal }) {
  const { isCreating, createGuest } = useCreateGuest();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = function (data) {
    createGuest({ ...data });
    // createGuest(
    //   { ...data },
    //   {
    //     onSuccess: (data) => {
    //       closeModal?.();
    //     },
    //   }
    // );
  };

  return (
    <Form type='modal' onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          disabled={isCreating}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Email address' error={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isCreating}
          {...register('email', {
            required: 'Email address is required',
            pattern: {
              // google: email regex JavaScript
              value: /\S+@\S+\.\S+/,
              message: 'Please specify a valid email',
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation='secondary'
          type='reset'
          disabled={isCreating}
          onClick={() => closeModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Add new guest</Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
