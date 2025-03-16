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

function AddCabin() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add new cabin</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Cabin</DialogTitle>
        <CabinForm />
      </DialogContent>
    </Dialog>
    // <div>
    //   <Modal>
    //     <Modal.Open opens='cabin-form'>
    //       <Button>Add new cabin</Button>
    //     </Modal.Open>
    //     <Modal.Window name='cabin-form'>
    //       <CreateCabinForm />
    //     </Modal.Window>
    //   </Modal>
    // </div>
  );
}

export default AddCabin;
