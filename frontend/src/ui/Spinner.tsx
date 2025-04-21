import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className='bg-cGrey-200 h-screen'>
      <div className='mx-auto pt-52 w-52'>
        <Loader2 className='w-36 h-36 animate-spin text-cBrand-500' strokeWidth='2' />
      </div>
    </div>
  );
}
