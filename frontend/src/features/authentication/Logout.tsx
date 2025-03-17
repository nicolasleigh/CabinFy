import { AiOutlineLogout } from "react-icons/ai";
import { useLogout } from "./useLogout";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <Button variant='destructive' className='px-3' disabled={isLoading} onClick={logout} aria-label='log out'>
      {!isLoading ? <AiOutlineLogout /> : <Loader2 className='animate-spin' />}
    </Button>
  );
}

export default Logout;
