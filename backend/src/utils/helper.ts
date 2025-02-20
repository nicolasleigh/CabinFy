import { differenceInDays, parseISO } from 'date-fns';

export const subtractDates = (dateStr1: string, dateStr2: string) =>
  differenceInDays(parseISO(dateStr1), parseISO(dateStr2));
