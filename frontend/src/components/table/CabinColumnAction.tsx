import { useDeleteBooking } from "@/features/bookings/useDeleteBooking";
import { useCheckout } from "@/features/check-in-out/useCheckout";
import { Copy, Loader, MoreHorizontal, Pencil, Trash } from "lucide-react";
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
import { useDeleteCabin } from "@/features/cabins/useDeleteCabin";
import { useDuplicateCabin } from "@/features/cabins/useDuplicateCabin";
import CabinForm from "@/features/cabins/CabinForm";
import DialogItem from "./DialogItem";

export default function CabinColumnAction({ id, cabin }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const navigate = useNavigate();
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isDuplicating, duplicateCabin } = useDuplicateCabin();

  function handleDuplicate() {
    duplicateCabin({
      id,
    });
  }

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
        <DropdownMenuItem onClick={handleDuplicate} disabled={isDuplicating}>
          <div className='flex items-center gap-3 w-full'>
            <Copy strokeWidth={0.9} size={20} />
            <span>{"Duplicate"}</span>
          </div>
        </DropdownMenuItem>

        <DialogItem
          triggerChildren={
            <div className='flex items-center gap-3'>
              <Pencil strokeWidth={0.9} size={20} />
              <span>{"Edit"}</span>
            </div>
          }
          open={openEditDialog}
          onOpenChange={(open) => {
            setOpenEditDialog(open);
            if (open === false) {
              setDropdownOpen(false);
            }
          }}
        >
          <DialogTitle>Edit Cabin</DialogTitle>
          <CabinForm
            isUpdate={true}
            initialState={cabin}
            onSubmit={() => {
              setOpenEditDialog(false);
              setDropdownOpen(false);
            }}
          />
        </DialogItem>

        <DialogItem
          triggerChildren={
            <div className='flex items-center gap-3'>
              <Trash strokeWidth={0.9} size={20} />
              <span>{"Delete"}</span>
            </div>
          }
          open={openDeleteDialog}
          onOpenChange={handleOpenDelete}
          className='max-w-[500px]'
        >
          <DialogHeader>
            <DialogTitle>{"Are you sure?"}</DialogTitle>
            <DialogDescription>{"This action will remove this cabin permanently!"}</DialogDescription>
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
                deleteCabin(id);
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
