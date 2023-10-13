import {
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import screensService from '@root/services/screens.service';
import { IScreenControl } from '@root/services/shared/screen-control.interface';
import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  screen: IScreenControl;
  actionType?: string;
  alternativeTitle?: string;
  alternativePathMatch?: string;
  pinExpand: boolean;
  pinShrink: boolean;
}

const ScreenLinkButton: React.FC<Props> = ({
  screen,
  actionType,
  alternativeTitle,
  alternativePathMatch,
  pinExpand,
  pinShrink,
  children,
}) => {
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
      to={screen.pathname}
      title={alternativeTitle ? alternativeTitle : screen.title}
      className={cn('flex py-4 text-sm font-bold duration-150', {
        'hover:bg-primary-light-40': !screensService.isActivePath(
          alternativePathMatch ? alternativePathMatch : screen.pathname
        ),
        'bg-primary': screensService.isActivePath(
          alternativePathMatch ? alternativePathMatch : screen.pathname
        ),
        'w-52 justify-start rounded-md': pinExpand,
        'lg:w-52 lg:justify-start lg:rounded-md': !pinShrink,
        'w-3/4 justify-center rounded-full': !pinExpand,
        'pointer-events-none':
          location.pathname.includes(screen.pathname) ||
          (alternativePathMatch &&
            location.pathname.includes(alternativePathMatch)),
      })}
      onClick={handleClick}
    >
      <div
        className={cn('flex justify-center', {
          'mx-3 w-8': pinExpand,
          'lg:mx-3 lg:w-8': !pinShrink,
        })}
      >
        {children}
      </div>
      <span
        className={cn({
          'lg:flex': !pinShrink,
          hidden: !pinExpand,
        })}
      >
        {alternativeTitle ? alternativeTitle : screen.title}
      </span>
    </Link>
  );
};

export default ScreenLinkButton;
