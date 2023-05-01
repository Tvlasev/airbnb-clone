"use client";

import { FC, useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="telative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={() => {}}
        >
          Airbnb your home
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md bg-white overflow-hidden w-1/6 right-0 top-15 text-sm">
          <div className="flex flex-col curstor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={() => {}} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={signOut} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
