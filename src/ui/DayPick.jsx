import 'react-day-picker/dist/style.css';
import '../styles/day-picker.css';
import { differenceInCalendarDays } from 'date-fns';
import { useState } from 'react';
import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { zhCN } from 'date-fns/locale';
import styled from 'styled-components';

const CheckIn = styled.input`
  text-transform: uppercase;
  padding: 1rem 2rem;
  border-radius: var(--border-radius-lg) 0 0 var(--border-radius-lg);
  border: none;
  border-right: 1px solid var(--color-grey-300);
  width: 50%;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: var(--color-grey-50);
  }
`;
const CheckOut = styled.input`
  text-transform: uppercase;
  padding: 1rem 2rem;
  border-radius: 0 var(--border-radius-lg) var(--border-radius-lg) 0;
  border: none;
  width: 50%;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: var(--color-grey-50);
  }
`;

const InputGroup = styled.div`
  margin-top: 2rem;
`;

export default function DayPick({
  selectedRange,
  setSelectedRange,
  setFromValue,
  setToValue,
  fromValue,
  toValue,
  maxBookingLength,
}) {
  // const [selectedRange, setSelectedRange] = useState();
  // const [fromValue, setFromValue] = useState('');
  // const [toValue, setToValue] = useState('');

  const handleFromChange = (e) => {
    setFromValue(e.target.value);
    const date = parse(e.target.value, 'y-MM-dd', new Date());
    if (!isValid(date)) {
      return setSelectedRange({ from: undefined, to: undefined });
    }
    if (selectedRange?.to && isAfter(date, selectedRange.to)) {
      setSelectedRange({ from: selectedRange.to, to: date });
    } else {
      setSelectedRange({ from: date, to: selectedRange?.to });
    }
  };

  const handleToChange = (e) => {
    setToValue(e.target.value);
    const date = parse(e.target.value, 'y-MM-dd', new Date());

    if (!isValid(date)) {
      return setSelectedRange({ from: selectedRange?.from, to: undefined });
    }
    if (selectedRange?.from && isBefore(date, selectedRange.from)) {
      setSelectedRange({ from: date, to: selectedRange.from });
    } else {
      setSelectedRange({ from: selectedRange?.from, to: date });
    }
  };

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    if (range?.from) {
      setFromValue(format(range.from, 'y-MM-dd'));
    } else {
      setFromValue('');
    }
    if (range?.to) {
      setToValue(format(range.to, 'y-MM-dd'));
    } else {
      setToValue('');
    }
  };

  const isPastDate = (date) => {
    return differenceInCalendarDays(date, new Date()) < 0;
  };

  const isGreaterThanMaxBookingLength = (date) => {
    return (
      differenceInCalendarDays(selectedRange?.to, selectedRange?.from) + 1 >
      maxBookingLength
    );
  };

  return (
    <DayPicker
      mode='range'
      selected={selectedRange}
      onSelect={handleRangeSelect}
      disabled={[isPastDate]}
      locale={zhCN}
      footer={
        <InputGroup>
          <CheckIn
            size={10}
            placeholder='From Date'
            value={fromValue}
            onChange={handleFromChange}
            disabled={true}
          />

          <CheckOut
            size={10}
            placeholder='To Date'
            value={toValue}
            onChange={handleToChange}
            disabled={true}
          />
        </InputGroup>
      }
    />
  );
}
