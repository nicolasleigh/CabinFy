import {
  differenceInCalendarDays,
  format,
  isAfter,
  isBefore,
  isValid,
  parse,
} from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styled from 'styled-components';
import '../styles/day-picker.css';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

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
    background-color: var(--color-grey-200);
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
    background-color: var(--color-grey-200);
  }
`;

const InputGroup = styled.div`
  margin-top: 2rem;
`;

interface Props {
  selectedRange: DateRange;
  setSelectedRange: (range: DateRange) => void;
  setFromValue: (value: string) => void;
  setToValue: (value: string) => void;
  fromValue: string;
  toValue: string;
  minBookingLength: number;
  maxBookingLength: number;
  booking: any;
}

export default function DayPick({
  selectedRange,
  setSelectedRange,
  setFromValue,
  setToValue,
  fromValue,
  toValue,
  minBookingLength,
  maxBookingLength,
  booking,
}: Props) {
  // const [selectedRange, setSelectedRange] = useState();
  // const [fromValue, setFromValue] = useState('');
  // const [toValue, setToValue] = useState('');

  const handleFromChange = (e: any) => {
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

  const handleToChange = (e: any) => {
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

  const handleRangeSelect = (range: any) => {
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

  const isPastDate = (date: any) => {
    return differenceInCalendarDays(date, new Date()) < 0;
  };

  const datesArr = booking?.map((book: any) => {
    return [book.startDate, book.endDate];
  });

  const range = datesArr?.map((date: any) => {
    const range: DateRange = {
      from: new Date(date[0]),
      to: new Date(date[1]),
    };
    return range;
  });
  // console.log(range);

  let disabledDays;
  if (range) {
    disabledDays = [...range, isPastDate];
  }

  useEffect(() => {
    if (fromValue && toValue) {
      if (range) {
        for (let i = 0; i < range.length; i++) {
          if (
            isBefore(new Date(fromValue), range[i].from) &&
            isAfter(new Date(toValue), range[i].to)
          ) {
            toast.error('Please select a valid range');
            setSelectedRange({ from: undefined, to: undefined });
            setFromValue('');
            setToValue('');
            break;
          }
        }
      }
    }
  }, [range, fromValue, toValue]);

  return (
    <DayPicker
      mode='range'
      selected={selectedRange}
      onSelect={handleRangeSelect}
      disabled={disabledDays}
      locale={zhCN}
      min={minBookingLength >= 2 ? minBookingLength : undefined}
      max={maxBookingLength}
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
