import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

function UpdateSettingsForm() {
  const { isLoading, settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {} } =
    useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: Number(value) });
  }

  const form = useForm();

  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form {...form}>
      <FormField
        name='min-nights'
        render={() => (
          <FormItem>
            <FormLabel>Minimum nights</FormLabel>
            <Input
              type='number'
              id='min-nights'
              disabled={isUpdating}
              defaultValue={minBookingLength}
              onBlur={(e) => handleUpdate(e, "minBookingLength")}
              min={0}
            />
          </FormItem>
        )}
      />
      <FormField
        name='max-nights'
        render={() => (
          <FormItem>
            <FormLabel>Maximum nights</FormLabel>
            <Input
              type='number'
              id='max-nights'
              defaultValue={maxBookingLength}
              onBlur={(e) => handleUpdate(e, "maxBookingLength")}
              disabled={isUpdating}
              min={0}
            />
          </FormItem>
        )}
      />
      <FormField
        name='max-nights'
        render={() => (
          <FormItem>
            <FormLabel>Maximum guests</FormLabel>
            <Input
              type='number'
              defaultValue={maxGuestsPerBooking}
              onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
              disabled={isUpdating}
              id='max-guests'
              min={0}
            />
          </FormItem>
        )}
      />
      <FormField
        name='max-nights'
        render={() => (
          <FormItem>
            <FormLabel>Breakfast price</FormLabel>
            <Input
              type='number'
              defaultValue={breakfastPrice}
              onBlur={(e) => handleUpdate(e, "breakfastPrice")}
              disabled={isUpdating}
              id='breakfast-price'
              min={0}
            />
          </FormItem>
        )}
      />
    </Form>
  );
}

export default UpdateSettingsForm;
