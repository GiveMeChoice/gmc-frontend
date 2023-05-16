/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import router from 'next/router';
import React from 'react';
import { auth } from '../../../lib/firebase';
import { DropdownMenuName } from '../DropdownMenu';
import DropdownItemButton from './DropdownItemButton';
import ProfileDropdownSection from './MainDropdownMenu/ProfileDropdownSection';

interface Props {
  setActiveMenu: (name: DropdownMenuName) => void;
}

const MainDropdownMenu: React.FC<Props> = ({ setActiveMenu }) => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pb-3">
      <ProfileDropdownSection />
      <div className="my-2 flex flex-col">
        {/* <DropdownItemButton
          handleClick={() => {
            if (router.pathname === '/') {
              router.reload();
            } else {
              router.push('/');
            }
          }}
          leftIcon={
            <Image
              draggable={false}
              src="/img/home.svg"
              alt="Home Icon"
              height={20}
              width={20}
            />
          }
        >
          <span className="text-base">Home</span>
        </DropdownItemButton> */}
        <DropdownItemButton
          handleClick={() => {
            setActiveMenu(DropdownMenuName.FAVORITES);
          }}
          leftIcon={
            <Image
              draggable={false}
              src="/img/heart.svg"
              alt="Heart Icon"
              height={20}
              width={20}
            />
          }
          rightIcon={
            <img draggable={false} src="/img/angle-right.svg" alt="User Icon" />
          }
        >
          <span className="text-base">Favorites</span>
        </DropdownItemButton>

        <DropdownItemButton
          handleClick={() => {
            setActiveMenu(DropdownMenuName.THEME);
          }}
          leftIcon={
            <Image
              draggable={false}
              src="/img/tree.svg"
              alt="Tree Icon"
              height={17}
              width={17}
            />
          }
          rightIcon={
            <img
              draggable={false}
              src="/img/angle-right.svg"
              alt="Angle Right Icon"
            />
          }
        >
          <span className="text-base">Appearance</span>
        </DropdownItemButton>
      </div>

      <hr className="mb-2 border-black dark:border-white" />

      <DropdownItemButton handleClick={handleSignOut} centered>
        <div className="flex items-center gap-1">
          <span className="text-base">Sign Out</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full">
            <Image
              draggable={false}
              src="/img/logout.svg"
              alt="Logout Icon"
              height={22}
              width={22}
            />
          </div>
        </div>
      </DropdownItemButton>
    </div>
  );
};

export default MainDropdownMenu;
