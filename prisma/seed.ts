import { PrismaClient } from '@prisma/client';
import { guests } from './data/guests.js';
import { cabins } from './data/cabins.js';
import { bookings } from './data/bookings.js';
import { settings } from './data/settings.js';
import { subtractDates } from '../src/utils/helper.js';
import { differenceInCalendarDays, isFuture, isPast, isToday } from 'date-fns';
import { reviews } from './data/reviews.js';

const prisma = new PrismaClient();
async function main() {
  setTimeout(() => {
    guests.map(async (guest) => {
      await prisma.guests.create({
        data: {
          uid: guest.uid,
          fullName: guest.fullName,
          email: guest.email,
          password: guest.password,
          salt: guest.salt,
        },
      });
    });
  }, 1000);

  setTimeout(() => {
    cabins.map(async (cabin) => {
      await prisma.cabins.create({
        data: {
          name: cabin.name,
          bedroom: cabin.bedroom,
          regularPrice: cabin.regularPrice,
          discount: cabin.discount,
          image: cabin.image,
          images: cabin.images,
          location: cabin.location,
        },
      });
    });
  }, 2000);

  setTimeout(() => {
    settings.map(async (setting) => {
      await prisma.settings.create({
        data: {
          maxBookingLength: setting.maxBookingLength,
          minBookingLength: setting.minBookingLength,
          maxGuestsPerBooking: setting.maxGuestsPerBooking,
          breakfastPrice: setting.breakfastPrice,
        },
      });
    });
  }, 3000);

  setTimeout(() => {
    reviews.map(async (review) => {
      await prisma.reviews.create({
        data: {
          rating: review.rating,
          comment: review.comment,
          cabinId: review.cabinId,
          guestId: review.guestId,
        },
      });
    });
  }, 4000);

  setTimeout(() => {
    bookings.map(async (booking) => {
      // const numNights = subtractDates(booking.endDate, booking.startDate);
      const numNights =
        differenceInCalendarDays(booking.endDate, booking.startDate) + 1;

      const cabin = await prisma.cabins.findUnique({
        where: { id: booking.cabinId },
      });
      let cabinPrice = 0;
      if (cabin) {
        if (!cabin.discount) cabin.discount = 0;
        // cabinPrice = numNights * (cabin.regularPrice - (cabin.discount ?? 0));
        cabinPrice =
          numNights * cabin.regularPrice * (1 - cabin.discount / 100);
      }

      const setting = await prisma.settings.findUnique({
        where: { id: 1 },
      });
      let extrasPrice = 0;
      if (setting) {
        extrasPrice = booking.hasBreakfast
          ? numNights * setting.breakfastPrice * booking.numGuests
          : 0;
      }

      const totalPrice = cabinPrice + extrasPrice;

      let status = 'unconfirmed';
      if (
        isPast(new Date(booking.endDate)) &&
        !isToday(new Date(booking.endDate))
      )
        status = 'checked-out';
      if (
        isFuture(new Date(booking.startDate)) ||
        isToday(new Date(booking.startDate))
      )
        status = 'unconfirmed';
      if (
        (isFuture(new Date(booking.endDate)) ||
          isToday(new Date(booking.endDate))) &&
        isPast(new Date(booking.startDate)) &&
        !isToday(new Date(booking.startDate))
      )
        status = 'checked-in';

      await prisma.bookings.create({
        data: {
          created_at: booking.created_at,
          startDate: booking.startDate,
          endDate: booking.endDate,
          numGuests: booking.numGuests,
          numNights,
          cabinPrice,
          extrasPrice,
          totalPrice,
          status,
          hasBreakfast: booking.hasBreakfast,
          isPaid: booking.isPaid,
          cabinId: booking.cabinId,
          guestId: booking.guestId,
        },
      });
    });
  }, 5000);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
