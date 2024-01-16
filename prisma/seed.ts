import { PrismaClient } from '@prisma/client';
import { guests } from './data/guests.js';
import { cabins } from './data/cabins.js';
import { bookings } from './data/bookings.js';
import { settings } from './data/settings.js';
import { subtractDates } from '../src/utils/helper.js';
import { isFuture, isPast, isToday } from 'date-fns';

const prisma = new PrismaClient();
async function main() {
  await Promise.all(
    guests.map(async (guest, index) => {
      await prisma.guests.upsert({
        where: { id: index + 1 },
        update: {},
        create: {
          fullName: guest.fullName,
          email: guest.email,
        },
      });
    })
  );
  console.log(guests.length);

  await Promise.all(
    cabins.map(async (cabin, index) => {
      await prisma.cabins.upsert({
        where: { id: index + 1 },
        update: {},
        create: {
          name: cabin.name,
          maxCapacity: cabin.maxCapacity,
          regularPrice: cabin.regularPrice,
          discount: cabin.discount,
          image: cabin.image,
          description: cabin.description,
        },
      });
    })
  );

  await Promise.all(
    settings.map(async (setting, index) => {
      await prisma.settings.upsert({
        where: { id: index + 1 },
        update: {},
        create: {
          maxBookingLength: setting.maxBookingLength,
          minBookingLength: setting.minBookingLength,
          maxGuestsPerBooking: setting.maxGuestsPerBooking,
          breakfastPrice: setting.breakfastPrice,
        },
      });
    })
  );

  await Promise.all(
    bookings.map(async (booking, index) => {
      const numNights = subtractDates(booking.endDate, booking.startDate);

      const cabin = await prisma.cabins.findUnique({
        where: { id: booking.cabinId },
      });
      let cabinPrice = 0;
      if (cabin) {
        cabinPrice = numNights * (cabin.regularPrice - (cabin.discount ?? 0));
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

      await prisma.bookings.upsert({
        where: { id: index + 1 },
        update: {},
        create: {
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
          observation: booking.observation,
          cabinId: booking.cabinId,
          guestId: booking.guestId,
        },
      });
    })
  );
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
