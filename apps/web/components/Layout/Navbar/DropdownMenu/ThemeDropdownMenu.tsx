import React from 'react';
import { DropdownMenuName } from '../DropdownMenu';
import DropdownItemButton from './DropdownItemButton';
import ThemeColorButton from './ThemeColorButton';
import Image from 'next/image';
import { Theme } from 'gmc-types';
import { useUser } from '../../../Context/UserProvider';

interface Props {
  setActiveMenu: (name: DropdownMenuName) => void;
}

const ThemeDropdownMenu: React.FC<Props> = ({ setActiveMenu }) => {
  const { profile } = useUser();
  return (
    <div className={`flex w-full flex-col gap-1 rounded-lg px-2 py-2.5`}>
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
            src="/img/tree.svg"
            alt="Tree Icon"
            height={17}
            width={17}
          />
        }
      >
        <span className="text-base">Appearance</span>
      </DropdownItemButton>
      <hr className="my-1 border-black dark:border-white" />
      <div className="flex w-full flex-col gap-3 py-3">
        <div className="flex w-full justify-evenly">
          <ThemeColorButton
            color="white"
            theme={Theme.GMC_DEFAULT}
            title="Default"
          />
          <ThemeColorButton
            color="gmc-dune"
            theme={Theme.GMC_DUNE}
            title="Dune"
          />
          <ThemeColorButton
            color="gmc-jungle"
            theme={Theme.GMC_JUNGLE}
            title="Jungle"
          />
          <ThemeColorButton
            color="gmc-forest"
            theme={Theme.GMC_FOREST}
            title="Forest"
          />
        </div>
        <div className="flex w-full justify-evenly">
          <ThemeColorButton
            color="gmc-heart"
            theme={Theme.GMC_HEART}
            title="Heart"
          />
          <ThemeColorButton
            color="gmc-glacier"
            theme={Theme.GMC_GLACIER}
            title="Glacier"
          />
          <ThemeColorButton
            color="gmc-beach"
            theme={Theme.GMC_BEACH}
            title="Beach"
          />
          <ThemeColorButton
            color="gmc-surf"
            theme={Theme.GMC_SURF}
            title="Surf"
          />
        </div>
        <div className="flex w-full justify-evenly">
          <ThemeColorButton
            color="gmc-soil"
            theme={Theme.GMC_SOIL}
            title="Soil"
          />
          <ThemeColorButton
            color="gmc-berry"
            theme={Theme.GMC_BERRY}
            title="Berry"
          />
          <ThemeColorButton
            color="gmc-sunset"
            theme={Theme.GMC_SUNSET}
            title="Sunset"
          />
          <ThemeColorButton
            color="gmc-ocean"
            theme={Theme.GMC_OCEAN}
            title="Ocean"
          />
        </div>
      </div>
      <hr className="mt-1 border-black dark:border-white" />
      <div className="my-2.5 flex justify-center py-1 text-sm">
        Selected Theme:&nbsp;
        <span className="font-bold italic">
          {profile && profile.theme
            ? profile.theme.toString().split('_')[1]
            : ''}
        </span>
      </div>
    </div>
  );
};

export default ThemeDropdownMenu;
