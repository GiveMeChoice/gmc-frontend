import screensService from '@root/services/screens.service';
import { IScreenControl } from '@root/services/shared/screen-control.interface';
import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import {
  useFiltersDispatch,
  initialFilters,
} from '@root/context-providers/filters.provider';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';

interface Props {
  screen: IScreenControl;
  actionType?: string;
}

const NavbarSublink: React.FC<Props> = ({ screen, actionType }) => {
  const screenDispatch = useScreenDataDispatch();
  const filtersDispatch = useFiltersDispatch();

  const handleClick = () => {
    if (actionType) {
      filtersDispatch({ type: 'FILTERS_SAVE', value: initialFilters });
      screenDispatch({
        type: actionType as any,
        value: { data: [], meta: {} },
      });
    }
  };

  return (
    <Link
      className={cn('flex w-28 justify-center p-3 duration-150', {
        'bolder-text text-primary': screensService.isActive(screen),
        'hover:bolder-text hover:scale-105 hover:text-white':
          !screensService.isActive(screen),
      })}
      to={screen.pathname}
      onClick={handleClick}
    >
      {screen.title}
    </Link>
  );
};

export default NavbarSublink;
