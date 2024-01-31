import { z } from 'zod';

export const cabinSchema = z.object({
  name: z.string().min(1, 'Name is required!').max(255),
  bedroom: z
    .number()
    .positive()
    .lte(10, { message: 'Bedroom must be less than 10!' }),
  regularPrice: z.number().positive(),
  discount: z
    .number()
    .positive()
    .lte(50, { message: 'Discount must be less than 50%!' }),
  image: z.string().min(1, 'Image is required!').max(255),
  location: z.string().min(1, 'Location is required!').max(255),
  images: z.string().min(1, 'Images is required!').max(255),
});

export const settingSchema = z.object({
  minBookingLength: z.number().positive(),
  maxBookingLength: z.number().positive(),
  maxGuestsPerBooking: z.number().positive(),
  breakfastPrice: z.number().positive(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating must be between 1 and 5!').max(5),
  comment: z.string().min(1, 'Comment is required!').max(255),
});

export const guestSchema = z.object({
  uid: z.string().uuid(),
  fullName: z.string().min(1, 'Full name is required!').max(255),
  email: z.string().email(),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters long!')
    .max(255),
  ip: z.string().ip(),
});

export const bookingSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  numNights: z.number().positive(),
  numGuests: z.number().positive(),
  cabinPrice: z.number().positive(),
  extrasPrice: z.number().positive(),
  totalPrice: z.number().positive(),
  status: z.string(),
  hasBreakfast: z.boolean(),
  isPaid: z.boolean(),
});
