import styled from 'styled-components';

const BreakfastBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3rem;
`;

const Label = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
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
`;

const Checkbox = styled.input`
  width: 2rem;
  height: 2rem;
`;

export default function BookingBreakfastBox({ breakfast, setBreakfast }) {
  return (
    <BreakfastBox>
      <Label>Want breakfast?</Label>
      <CheckboxGroup>
        <div className='yes'>
          <label htmlFor='yes'>Yes</label>
          <Checkbox
            id='yes'
            type='checkbox'
            onClick={() => setBreakfast(true)}
            checked={breakfast}
            readOnly
          />
        </div>
        <div className='no'>
          <label htmlFor='no'>No</label>
          <Checkbox
            id='no'
            type='checkbox'
            onClick={() => setBreakfast(false)}
            checked={!breakfast}
            readOnly
          />
        </div>
      </CheckboxGroup>
    </BreakfastBox>
  );
}
