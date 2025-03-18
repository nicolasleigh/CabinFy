/* eslint-disable react/jsx-key */
// import { FaUserCircle } from 'react-icons/fa';
// import { IoMdMenu } from 'react-icons/io';
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { styled } from "styled-components";
import DropDown from "../../ui/Dropdown";
import { useLoginModal, useSignupModal } from "../../hooks";
import { useGuest } from "./useGuest";
import { useLogout } from "./useLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import DialogItem from "@/components/table/DialogItem";
import SignUpForm from "../authentication/SignupForm";
import GuestSignUpForm from "./GuestSignUpForm";
import { useState } from "react";
import GuestLoginForm from "./GuestLoginForm";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const StyledGuestHeaderMenu = styled.nav`
  display: flex;
  gap: 0.6rem;
  padding-right: 5rem;

  @media (max-width: 735px) {
    padding-right: 2.2rem;
  }

  @media (max-width: 450px) {
    padding-right: 1.2rem;
  }
`;

const NavButton = styled.button`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1.2rem;
  font-size: 3rem;
  color: var(--color-grey-500);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:active,
  &:focus {
    background-color: var(--color-grey-100);
    box-shadow: 0 0 0 1px var(--color-grey-300);
    outline: none;
  }
`;

const MenuButton = styled.button`
  text-align: left;
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;
  width: 100%;
  display: inline-block;

  &:hover,
  &:active,
  &:focus {
    outline: none;
  }
`;

const HeaderAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--color-grey-900);
  color: var(--color-grey-100);
  text-align: center;
  vertical-align: middle;
  line-height: 3rem;
  font-size: 1.6rem;
`;

function GuestHeaderMenu() {
  const { setIsOpen: setSignupOpen } = useSignupModal();
  const { setIsOpen: setLoginOpen } = useLoginModal();
  const { guest, isLoading } = useGuest();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const shortName = guest?.fullName?.charAt(0);
  const queryClient = useQueryClient();

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
        <DropdownMenuContent className='min-w-0 w-24' align='end'>
          <DialogItem
            triggerChildren={<div>Sign Up</div>}
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
            triggerChildren={<div>Log In</div>}
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
          <DropdownMenuItem>
            <div
              onClick={() => {
                logout();
                // queryClient.invalidateQueries(["guest"]);
                // queryClient.removeQueries(["guest"]);
              }}
            >
              Log Out
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default GuestHeaderMenu;
