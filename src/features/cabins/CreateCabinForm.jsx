import Input from '../../ui/Input';
// import Form from '../../ui/Form';
import Button from '../../ui/Button';
import { FileInput, FileInputMultiple } from '../../ui/FileInput';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';
import styled from 'styled-components';
import FormRowVertical from '../../ui/FormRowVertical';

const Form = styled.form`
  width: 50rem;
  margin: 0 auto;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  // console.log(errors);

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    console.log(data);
    if (isEditSession)
      editCabin(
        {
          newCabinData: {
            ...data,
            image: data.image[0],
            images: [
              data.images[0],
              data.images[1],
              data.images[2],
              data.images[3],
            ],
          },
          id: editId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        {
          ...data,
          image: data.image[0],
          images: [
            data.images[0],
            data.images[1],
            data.images[2],
            data.images[3],
          ],
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type='cabin-form'>
      <FormRowVertical label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRowVertical>
      <FormRowVertical label='Location' error={errors?.location?.message}>
        <Input
          type='text'
          id='location'
          disabled={isWorking}
          {...register('location', {
            required: 'This field is required',
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label='Bedroom quantity'
        error={errors?.bedroom?.message}
      >
        <Input
          type='number'
          id='bedroom'
          disabled={isWorking}
          {...register('bedroom', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Bedroom quantity should be at least 1',
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label='Cabin price'
        error={errors?.regularPrice?.message}
      >
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Cabin price should be at least 1',
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label='Discount (percentage %)'
        error={errors?.discount?.message}
      >
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            min: {
              value: 0,
              message: 'Discount should not be negative ',
            },
            validate: (value) =>
              value <= 50 || 'Discount should be less than 50%',
          })}
        />
      </FormRowVertical>

      {/* <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          disabled={isWorking}
          defaultValue=''
          {...register('description')}
        />
      </FormRow> */}

      <FormRowVertical
        label='Cover photo (require 1)'
        error={errors?.image?.message}
      >
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label='Internal photos (require 4)'
        error={errors?.images?.message}
      >
        <FileInputMultiple
          id='image'
          accept='image/*'
          {...register('images', {
            required: isEditSession ? false : 'This field is required',
            validate: (value) => value.length === 4 || '4 photos are required',
          })}
        />
      </FormRowVertical>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
