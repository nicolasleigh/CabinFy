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
      return <img src={image} alt='Image' />;
    },
  },
  {
    accessorKey: "name",
    header: "Cabin",
    cell: ({ row }) => {
      const cabin = row.getValue("name");
      return <div className='capitalize font-semibold text-[10px] sm:text-xs lg:text-sm'>{cabin}</div>;
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
      return <div className='capitalize font-semibold text-xs lg:text-sm'>{formatCurrency(value)}</div>;
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    // enableHiding: true,
    cell: ({ row }) => {
      const value = row.getValue("discount");
      return <div className='capitalize font-semibold text-cGreen-700 text-xs lg:text-sm'>{value}%</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CabinColumnAction id={row.original.id} cabin={row.original} />;
    },
  },
];
