import screensService from '@root/services/screens.service';
import { IScreenControl } from '@root/services/shared/screen-control.interface';
import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  screen: IScreenControl;
  alternativeTitle?: string;
  alternativePathMatch?: string;
  pinExpand: boolean;
  pinShrink: boolean;
}

const ScreenLinkButton: React.FC<Props> = ({
  screen,
  alternativeTitle,
  alternativePathMatch,
  pinExpand,
  pinShrink,
  children,
}) => {
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
      })}
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
