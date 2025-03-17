import { useForm } from "react-hook-form";
// import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
// import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const passwordLength = import.meta.env.VITE_PASS_LENGTH;

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 border py-6 px-10 rounded-md'>
      <div className='flex items-center mb-8'>
        <Label htmlFor='password' className='w-36'>
          {`New Password`}
        </Label>
        <div className='relative'>
          <Input
            type='password'
            className='w-56'
            id='password'
            autoComplete='current-password'
            disabled={isUpdating}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: passwordLength,
                message: ` Password needs a minimum of ${passwordLength}  characters`,
              },
            })}
          />
          <p className='text-cRed-500 text-sm absolute'>{errors?.password?.message}</p>
        </div>
      </div>

      <div className='flex items-center mb-5'>
        <Label htmlFor='passwordConfirm' className='w-36'>
          Confirm Password
        </Label>
        <div className='relative'>
          <Input
            type='password'
            className='w-56'
            autoComplete='new-password'
            id='passwordConfirm'
            disabled={isUpdating}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) => getValues().password === value || "Passwords need to match",
            })}
          />
          <p className='text-cRed-500 text-sm absolute'>{errors?.passwordConfirm?.message}</p>
        </div>
      </div>

      <div className='flex gap-2 justify-end'>
        <Button className='hover:bg-cGrey-300' type='reset' variant='secondary' disabled={isUpdating} onClick={reset}>
          Cancel
        </Button>
        <Button className='bg-cBrand-500 hover:bg-cBrand-600 text-white' type='submit' disabled={isUpdating}>
          Update password
        </Button>
      </div>
    </form>
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label={`New Password (min ${passwordLength} chars)`} error={errors?.password?.message}>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: passwordLength,
              message: ` Password needs a minimum of ${passwordLength}  characters`,
            },
          })}
        />
      </FormRow>

      <FormRow label='Confirm password' error={errors?.passwordConfirm?.message}>
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type='reset' variation='secondary'>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
