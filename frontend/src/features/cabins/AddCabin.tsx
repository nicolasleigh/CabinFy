import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Modal from "../../ui/Modal";
import CabinForm from "./CabinForm";
import CreateCabinForm from "./CreateCabinForm";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

function AddCabin() {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-cBrand-600 text-cBrand-100 rounded-sm hover:bg-cBrand-700'>
          {t("addNewCabinButton")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{t("addCabin")}</DialogTitle>
        <CabinForm />
      </DialogContent>
    </Dialog>
  );
}

export default AddCabin;
