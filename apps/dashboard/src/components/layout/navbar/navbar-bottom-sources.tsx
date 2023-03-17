import cn from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavbarBottomSources: React.FC = () => {
  const location = useLocation();

  return (
    <div
      className={cn(
        'flex w-full border-b-2 border-secondary bg-zinc-900 pl-4 text-secondary-dark-10',
        {}
      )}
    >
      <Link
        className={cn('flex w-28 justify-center p-3 duration-150', {
          'bolder-text text-primary': location.pathname.includes('/sources'),
          'hover:bolder-text hover:scale-105 hover:text-white':
            !location.pathname.includes('/sources'),
        })}
        to="/product-sources/sources"
      >
        Sources
      </Link>
      <Link
        className={cn('flex w-28 justify-center p-3 duration-150', {
          'bolder-text text-primary': location.pathname.includes('/runs'),
          'hover:bolder-text hover:scale-105 hover:text-white':
            !location.pathname.includes('/runs'),
        })}
        to="/product-sources/runs"
      >
        Runs
      </Link>
      <div
        className={cn(
          'relative top-0 z-0 flex w-28 justify-center duration-300',
          {
            '-left-28': location.pathname.includes('/runs'),
            '-left-56': location.pathname.includes('/sources'),
          }
        )}
      >
        <div className={cn('z-0 h-1.5 w-16 rounded-b-lg bg-primary')} />
      </div>
    </div>
  );
};

export default NavbarBottomSources;
