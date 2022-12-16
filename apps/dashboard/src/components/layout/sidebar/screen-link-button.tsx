import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { matchesLocation } from '@root/helpers/matches-location';

interface Props {
  link: string;
  title: string;
  pinExpand: boolean;
  pinShrink: boolean;
}

const ScreenLinkButton: React.FC<Props> = ({
  link,
  title,
  pinExpand,
  pinShrink,
  children,
}) => {
  return (
    <Link
      to={link}
      title={title}
      className={cn('flex py-3 text-sm font-bold duration-150', {
        'hover:bg-primary-light-50': !matchesLocation(link),
        'bg-primary': matchesLocation(link),
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
        {title}
      </span>
    </Link>
  );
};

export default ScreenLinkButton;
