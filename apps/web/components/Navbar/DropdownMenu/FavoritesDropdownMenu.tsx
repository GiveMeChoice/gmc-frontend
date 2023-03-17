import React from 'react';
import { Theme } from '../../../lib/theme';
import { DropdownMenuName } from '../DropdownMenu';
import DropdownItemButton from './DropdownItemButton';
import ThemeColorButton from './ThemeColorButton';
import Image from 'next/image';

interface Props {
  setActiveMenu: (name: DropdownMenuName) => void;
}

const FavoritesDropdownMenu: React.FC<Props> = ({ setActiveMenu }) => {
  return (
    <ul className={`flex w-full flex-col gap-1 rounded-lg py-1.5`}>
      <DropdownItemButton
        handleClick={() => {
          setActiveMenu(DropdownMenuName.MAIN);
        }}
        centered
        leftIcon={
          <img
            draggable={false}
            src="/img/angle-left.svg"
            alt="Angle Left Icon"
          />
        }
        rightIcon={
          <Image
            draggable={false}
            src="/img/heart.svg"
            alt="Heart Icon"
            height={20}
            width={20}
          />
        }
      >
        <span className="text-base">Favorites</span>
      </DropdownItemButton>
      <hr className="border-black dark:border-white" />
      <div className="flex h-16 w-full items-center justify-center text-sm">
        Coming Soon...
      </div>
    </ul>
  );
};

export default FavoritesDropdownMenu;
