import { ExternalLink, Loader, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { forwardRef, useEffect, useRef, useState } from "react";

export default function BookingColumnAction({ id }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [hasOpenDialog, setHasOpenDialog] = useState(false);
  const dropdownTriggerRef = useRef(null);
  // const focusRef = useRef(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [busy, setBusy] = useState(false);

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='h-3 w-3 sm:w-8 sm:h-8 p-0'
          // ref={dropdownTriggerRef}
        >
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        // hidden={hasOpenDialog}
        hidden={openEditDialog || openDeleteDialog}
        // onCloseAutoFocus={(event) => {
        //   if (focusRef.current) {
        //     focusRef.current.focus();
        //     focusRef.current = null;
        //     event.preventDefault();
        //   }
        // }}
      >
        <DropdownMenuItem>
          <div className='flex items-center gap-3 w-full'>
            <ExternalLink strokeWidth={0.9} size={20} />
            <span>{"Open"}</span>
          </div>
        </DropdownMenuItem>
        {/* <Dialog>
          <DialogTrigger className="w-full"> */}
        <DialogItem
          triggerChildren={
            <div className='flex items-center gap-3'>
              <Pencil strokeWidth={0.9} size={20} />
              <span>{"Edit"}</span>
            </div>
          }
          open={openEditDialog}
          className='w-[900px]'
        >
          {/* <DialogHeader> */}
          <DialogTitle>{"Edit Movie"}</DialogTitle>
          {/* </DialogHeader> */}
        </DialogItem>

        <DropdownMenuSeparator />
        <DialogItem
          triggerChildren={
            <div className='flex items-center gap-3'>
              <Trash2 strokeWidth={0.9} size={20} />
              <span>{"Delete"}</span>
            </div>
          }
          // onSelect={handleDialogItemSelect}
          open={openDeleteDialog}
          // open={hasOpenDialog}
          className='w-[500px]'
        >
          <DialogHeader>
            <DialogTitle>{"Are you sure?"}</DialogTitle>
            <DialogDescription>{"This action will remove this movie permanently!"}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button disabled={busy} onClick={() => setOpenDeleteDialog(false)} variant='secondary'>
              {"Cancel"}
            </Button>
            <Button onClick={() => {}} variant='destructive' disabled={busy}>
              <span className='w-12 flex items-center justify-center'>
                {busy ? <Loader className='animate-spin' /> : "Delete"}
              </span>
            </Button>
          </DialogFooter>
        </DialogItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DialogItem = forwardRef((props, forwardedRef) => {
  const { triggerChildren, children, onSelect, onOpenChange, open, className, ...itemProps } = props;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          {...itemProps}
          // ref={forwardedRef}
          onSelect={(event) => {
            event.preventDefault();
            onSelect && onSelect();
          }}
        >
          {triggerChildren}
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent
          className={className}
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          {children}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
});
