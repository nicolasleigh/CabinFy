import BookingDataBox from "./BookingDataBox";
import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";
import { statusColor } from "@/utils/helpers";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useCheckout } from "../check-in-out/useCheckout";
import { useBooking } from "./useBooking";
import { useDeleteBooking } from "./useDeleteBooking";
import { useTranslation } from "react-i18next";

function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName='booking' />;

  const { status, id: bookingId } = booking;

  return (
    <>
      <div className='flex justify-between items-center mb-2 '>
        <div className='flex items-center gap-2'>
          <h1 className='text-xl max-md:text-lg font-semibold max-sm:text-base'>
            {t("bookingDetailHeader", { bookingId })}
          </h1>
          <Badge className={cn("rounded-full uppercase", statusColor[status])}>{status.replace("-", " ")}</Badge>
        </div>
        <Button variant='link' className='text-cBrand-500' onClick={moveBack}>
          &larr; {t("backButton")}
        </Button>
      </div>

      <BookingDataBox booking={booking} />

      <div className='mt-8 flex items-center justify-end gap-2 mb-5'>
        {status === "unconfirmed" && (
          <Button
            className='bg-cBrand-500 hover:bg-cBrand-600 text-cBrand-100'
            onClick={() => navigate(`/admin/checkin/${bookingId}`)}
          >
            {t("tableCheckin")}
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
            {t("tableCheckout")}
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
              {t("deleteBooking")}
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("tableDeleteTitle")}</DialogTitle>
              <DialogDescription>{t("tableDeleteDescription")}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                disabled={isDeleting}
                onClick={() => {
                  setOpen(false);
                }}
                variant='secondary'
              >
                {t("tableDeleteCancel")}
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
                  {isDeleting ? <Loader className='animate-spin' /> : t("tableDelete")}
                </span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button variant='secondary' onClick={moveBack}>
          {t("backButton")}
        </Button>
      </div>
    </>
  );
}

export default BookingDetail;
