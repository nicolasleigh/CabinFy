import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
// import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { statusColor } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Loader } from "lucide-react";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const [open, setOpen] = useState(false);

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName='booking' />;

  const { status, id: bookingId } = booking;

  return (
    <>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl font-semibold'>Booking #{bookingId}</h1>
          <Badge className={cn("rounded-full uppercase", statusColor[status])}>{status.replace("-", " ")}</Badge>
        </div>
        <Button variant='link' className='text-cBrand-500' onClick={moveBack}>
          &larr; Back
        </Button>
      </div>

      <BookingDataBox booking={booking} />

      <div className='mt-8 flex items-center justify-end gap-2'>
        {status === "unconfirmed" && (
          <Button
            className='bg-cBrand-500 hover:bg-cBrand-600 text-cBrand-100'
            onClick={() => navigate(`/admin/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            className='bg-cBrand-500 hover:bg-cBrand-600 text-cBrand-100'
            onClick={() => {
              checkout(bookingId);
            }}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className='bg-cRed-500 hover:bg-cRed-600 text-cRed-50'
              onClick={() => {
                setOpen(true);
              }}
              disabled={isDeleting}
            >
              Delete booking
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{"Are you sure?"}</DialogTitle>
              <DialogDescription>{"This action will remove this booking permanently!"}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                disabled={isDeleting}
                onClick={() => {
                  setOpen(false);
                }}
                variant='secondary'
              >
                {"Cancel"}
              </Button>
              <Button
                onClick={() => {
                  deleteBooking(bookingId, {
                    onSettled: () => {
                      navigate(-1);
                      setOpen(false);
                    },
                  });
                }}
                variant='destructive'
                disabled={isDeleting}
              >
                <span className='w-12 flex items-center justify-center'>
                  {isDeleting ? <Loader className='animate-spin' /> : "Delete"}
                </span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button variant='secondary' onClick={moveBack}>
          Back
        </Button>
      </div>
    </>
  );

  // return (
  //   <>
  //     <Row type='horizontal'>
  //       <HeadingGroup>
  //         <Heading as='h1'>Booking #{bookingId}</Heading>
  //         <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
  //       </HeadingGroup>
  //       <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
  //     </Row>

  //     <BookingDataBox booking={booking} />

  //     <ButtonGroup>
  //       {status === "unconfirmed" && <Button onClick={() => navigate(`/admin/checkin/${bookingId}`)}>Check in</Button>}

  //       {status === "checked-in" && (
  //         <Button
  //           onClick={() => {
  //             checkout(bookingId);
  //           }}
  //           disabled={isCheckingOut}
  //         >
  //           Check out
  //         </Button>
  //       )}

  //       <Modal>
  //         <Modal.Open opens='delete'>
  //           <Button variation='danger'>Delete booking</Button>
  //         </Modal.Open>
  //         <Modal.Window name='delete'>
  //           <ConfirmDelete
  //             resourceName='booking'
  //             disabled={isDeleting}
  //             onConfirm={() => {
  //               deleteBooking(bookingId, {
  //                 onSettled: () => navigate(-1),
  //               });
  //             }}
  //           />
  //         </Modal.Window>
  //       </Modal>

  //       <Button variation='secondary' onClick={moveBack}>
  //         Back
  //       </Button>
  //     </ButtonGroup>
  //   </>
  // );
}

export default BookingDetail;
