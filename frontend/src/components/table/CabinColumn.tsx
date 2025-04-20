import { ColumnDef } from "@tanstack/react-table";
import { format, isToday } from "date-fns";
import { Badge } from "../ui/badge";
import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";
import { cn } from "@/lib/utils";
import CabinColumnAction from "./CabinColumnAction";

export type Cabins = {
  name: string;
  location: string;
  regularPrice: number;
  discount: number;
};

export const columns: ColumnDef<Cabins>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image");
      return <img src={image} className='min-w-32 h-20 rounded-sm' alt='Image' />;
    },
  },
  {
    accessorKey: "name",
    header: "Cabin",
    cell: ({ row }) => {
      const cabin = row.getValue("name");
      return (
        <div className='capitalize font-semibold text-[10px] sm:text-xs lg:text-sm max-sm:font-normal'>{cabin}</div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const location = row.getValue("location");
      // console.log(row.original);
      return (
        <div className='flex flex-col'>
          <span className='capitalize text-[10px] sm:text-xs lg:text-sm'>{location}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "regularPrice",
    header: "Price",
    cell: ({ row }) => {
      const value = row.getValue("regularPrice");
      return (
        <div className='capitalize font-semibold text-[10px] sm:text-xs lg:text-sm max-sm:font-normal'>
          {formatCurrency(value)}
        </div>
      );
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    // enableHiding: true,
    cell: ({ row }) => {
      const value = row.getValue("discount");
      return (
        <div className='capitalize font-semibold text-cGreen-700 text-[10px] sm:text-xs lg:text-sm max-sm:font-normal'>
          {value}%
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CabinColumnAction id={row.original.id} cabin={row.original} />;
    },
  },
];
