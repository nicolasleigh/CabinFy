import DialogItem from "@/components/table/DialogItem";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Menu, UserRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import GuestLoginForm from "./GuestLoginForm";
import GuestSignUpForm from "./GuestSignUpForm";
import { useGuest } from "./useGuest";
import { useLogout } from "./useLogout";
import { useTranslation } from "react-i18next";

function GuestHeaderMenu() {
  const { guest, isLoading } = useGuest();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const { t } = useTranslation();

  const shortName = guest?.fullName?.charAt(0);

  return (
    <div>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='py-1 px-3'>
            <Menu />
            {guest ? (
              <div className='bg-cGrey-700 text-cGrey-0 flex items-center justify-center  rounded-full w-6 h-6'>
                {shortName}
              </div>
            ) : (
              <UserRound />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='min-w-0 w-28' align='end'>
          <DialogItem
            triggerChildren={<div>{t("signup")}</div>}
            open={openSignup}
            onOpenChange={(open) => {
              setOpenSignup(open);
              setOpenDropdown(open);
            }}
          >
            <GuestSignUpForm
              setOpen={(open) => {
                setOpenSignup(open);
                setOpenDropdown(open);
              }}
            />
          </DialogItem>
          <DialogItem
            triggerChildren={<div>{t("login")}</div>}
            open={openLogin}
            onOpenChange={(open) => {
              setOpenLogin(open);
              setOpenDropdown(open);
            }}
          >
            <GuestLoginForm
              setOpen={(open) => {
                setOpenLogin(open);
                setOpenDropdown(open);
              }}
            />
          </DialogItem>
          <DropdownMenuItem onClick={() => logout()}>{t("logout")}</DropdownMenuItem>
          <Separator />
          <DropdownMenuItem className='px-0'>
            <Link
              to='/admin'
              className='w-full text-center bg-red-600 text-white hover:bg-red-700 transition-colors rounded-sm px-1 py-1'
            >
              {t("adminLoginGuestPage")}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default GuestHeaderMenu;
