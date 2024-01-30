import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;
    // console.log([field]);
    // console.log(value);
    // console.log({ [field]: value });
    if (!value) return;
    updateSetting({ [field]: value });
  }

  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form>
      <FormRow label='Minimum nights'>
        <Input
          type='number'
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
          id='min-nights'
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Maximum nights'>
        <Input
          type='number'
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
          disabled={isUpdating}
          id='max-nights'
        />
      </FormRow>
      <FormRow label='Maximum guests'>
        <Input
          type='number'
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
          disabled={isUpdating}
          id='max-guests'
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
          disabled={isUpdating}
          id='breakfast-price'
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
