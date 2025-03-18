import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import styled from "styled-components";
// import { Label } from "./BookingFormLabel";

const BreakfastBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  & {
    .yes,
    .no {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
    }
  }

  @media (max-width: 900px) {
    font-size: 1.3rem;
  }
`;

const Checkbox = styled.input`
  width: 2rem;
  height: 2rem;
  color: red;
  background-color: red;

  @media (max-width: 900px) {
    width: 1.7rem;
    height: 1.7rem;
  }
`;

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
  // return (
  //   <BreakfastBox>
  //     <Label>Want breakfast?</Label>
  //     <CheckboxGroup>
  //       <div className='yes'>
  //         <label htmlFor='yes'>Yes</label>
  //         <Checkbox
  //           id='yes'
  //           type='checkbox'
  //           onClick={() => setHasBreakfast(true)}
  //           checked={hasBreakfast}
  //           readOnly
  //         />
  //       </div>
  //       <div className='no'>
  //         <label htmlFor='no'>No</label>
  //         <Checkbox
  //           id='no'
  //           type='checkbox'
  //           onClick={() => setHasBreakfast(false)}
  //           checked={!hasBreakfast}
  //           readOnly
  //         />
  //       </div>
  //     </CheckboxGroup>
  //   </BreakfastBox>
  // );
}
