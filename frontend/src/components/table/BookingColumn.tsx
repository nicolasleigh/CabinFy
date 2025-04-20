import { ColumnDef } from "@tanstack/react-table";
import BookingColumnAction from "./BookingColumnAction";
import { format, isToday } from "date-fns";
import { Badge } from "../ui/badge";
import { formatCurrency, formatDistanceFromNow, statusColor } from "@/utils/helpers";
import { cn } from "@/lib/utils";

export type Bookings = {
  cabin: string;
  guest: string;
  status: "public" | "private";
  date: string;
  amount: number;
};

export const columns: ColumnDef<Bookings>[] = [
  {
    accessorKey: "cabin",
    header: "Cabin",
    cell: ({ row }) => {
      const cabin = row.getValue("cabin");
      return (
        <div className='capitalize font-semibold text-[10px] sm:text-xs lg:text-sm max-md:font-normal'>
          {cabin.name}
        </div>
      );
    },
  },
  {
    accessorKey: "guest",
    header: "Guest",
    cell: ({ row }) => {
      const guest = row.getValue("guest");
      // console.log(row.original);
      return (
        <div className='flex flex-col'>
          <span className='capitalize font-semibold text-[10px] sm:text-xs lg:text-sm max-md:font-normal'>
            {guest.fullName}
          </span>
          <span className='text-xs text-muted-foreground'>{guest.email}</span>
        </div>
      );
    },
  },
  {
    // accessorKey: "startDate",
    header: "Dates",
    // size: 200,
    cell: ({ row }) => {
      const startDate = row.original.startDate;
      const endDate = row.original.endDate;
      const numNights = row.original.numNights;
      return (
        <div className='flex flex-col min-w-[150px]'>
          <span className='font-semibold max-md:font-normal max-md:text-xs'>
            {isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)} &rarr;{" "}
            <span className='bg-cBrand-100 rounded-md px-1 py-[2px] text-cBrand-600'>{numNights}</span> night stay
          </span>
          <span className='text-xs max-md:text-[10px] text-muted-foreground'>
            {format(new Date(startDate), "yyyy-MM-dd")} &mdash; {format(new Date(endDate), "yyyy-MM-dd")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge className={cn("rounded-full max-md:font-normal max-md:text-[10px]", statusColor[status])}>
          {status.replace("-", " ").toUpperCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Amount",
    cell: ({ row }) => {
      const value = row.getValue("totalPrice");
      return (
        <div className='capitalize font-semibold text-xs lg:text-sm max-md:font-normal max-md:text-[10px]'>
          {formatCurrency(value)}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <BookingColumnAction id={row.original.id} status={row.original.status} />;
    },
  },
];
