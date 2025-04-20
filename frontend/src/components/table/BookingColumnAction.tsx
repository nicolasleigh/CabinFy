import { useDeleteBooking } from "@/features/bookings/useDeleteBooking";
import { useCheckout } from "@/features/check-in-out/useCheckout";
import { Loader, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineDownload, AiOutlineEye, AiOutlineUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import DialogItem from "./DialogItem";

export default function BookingColumnAction({ id, status }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  function handleOpenDelete(open) {
    setOpenDeleteDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-3 w-3 sm:w-8 sm:h-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => navigate(`/admin/bookings/${id}`)}>
          <div className='flex items-center gap-3 w-full'>
            <AiOutlineEye strokeWidth={0.9} size={20} />
            <span>{"Details"}</span>
          </div>
        </DropdownMenuItem>

        {status === "unconfirmed" && (
          <DropdownMenuItem onClick={() => navigate(`/admin/checkin/${id}`)}>
            <div className='flex items-center gap-3 w-full'>
              <AiOutlineDownload strokeWidth={0.9} size={20} />
              <span>{"Check in"}</span>
            </div>
          </DropdownMenuItem>
        )}

        {status === "checked-in" && (
          <DropdownMenuItem onClick={() => checkout(id)} disabled={isCheckingOut}>
            <div className='flex items-center gap-3 w-full'>
              <AiOutlineUpload strokeWidth={0.9} size={20} />
              <span>{"Check out"}</span>
            </div>
          </DropdownMenuItem>
        )}

        <DialogItem
          triggerChildren={
            <div className='flex items-center gap-3'>
              <AiOutlineDelete strokeWidth={0.9} size={20} />
              <span>{"Delete"}</span>
            </div>
          }
          open={openDeleteDialog}
          onOpenChange={handleOpenDelete}
          className='max-w-[500px]'
        >
          <DialogHeader>
            <DialogTitle>{"Are you sure?"}</DialogTitle>
            <DialogDescription>{"This action will remove this booking permanently!"}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={isDeleting}
              onClick={() => {
                setOpenDeleteDialog(false);
                setDropdownOpen(false);
              }}
              variant='secondary'
            >
              {"Cancel"}
            </Button>
            <Button
              onClick={() => {
                deleteBooking(id);
                setOpenDeleteDialog(false);
                setDropdownOpen(false);
              }}
              variant='destructive'
              disabled={isDeleting}
            >
              <span className='w-12 flex items-center justify-center'>
                {isDeleting ? <Loader className='animate-spin' /> : "Delete"}
              </span>
            </Button>
          </DialogFooter>
        </DialogItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
