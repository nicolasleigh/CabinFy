import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BookingBreakfastBox({ hasBreakfast, setHasBreakfast }) {
  return (
    <div className='flex gap-2 items-center'>
      <Label>Want breakfast?</Label>
      <div className='flex items-center'>
        <div className='flex items-center'>
          <Label htmlFor='yes'>Yes</Label>
          <Input id='yes' type='checkbox' onClick={() => setHasBreakfast(true)} checked={hasBreakfast} readOnly />
        </div>
        <div className='flex items-center'>
          <Label htmlFor='no'>No</Label>
          <Input id='no' type='checkbox' onClick={() => setHasBreakfast(false)} checked={!hasBreakfast} readOnly />
        </div>
      </div>
    </div>
  );
}
