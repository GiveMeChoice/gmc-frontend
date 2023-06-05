import screensService from '@root/services/screens.service';
import { IScreenControl } from '@root/services/shared/screen-control.interface';
import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  screen: IScreenControl;
}

const NavbarSublink: React.FC<Props> = ({ screen }) => {
  return (
    <Link
      className={cn('flex w-28 justify-center p-3 duration-150', {
        'bolder-text text-primary': screensService.isActive(screen),
        'hover:bolder-text hover:scale-105 hover:text-white':
          !screensService.isActive(screen),
      })}
      to={screen.pathname}
    >
      {screen.title}
    </Link>
  );
};

export default NavbarSublink;
