import {
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import cn from 'classnames';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavbarBottom: React.FC = () => {
  const [optionsOn, setOptionsOn] = useState<boolean>(false);
  const location = useLocation();
  const { filterBarVisible } = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const toggleFilters = () => {
    if (filterBarVisible) {
      filtersDispatch({ type: 'EXIT_FILTER_BAR' });
    } else {
      filtersDispatch({ type: 'ENTER_FILTER_BAR' });
    }
  };

  return (
    <div
      className={cn(
        'flex w-full border-b-2 border-secondary bg-zinc-900 pl-4 text-secondary-dark-10',
        {}
      )}
    >
      <Link
        className={cn('flex w-28 justify-center p-3 duration-150', {
          'bolder-text text-primary': location.pathname.includes('/labels'),
          'hover:bolder-text hover:scale-105 hover:text-white':
            !location.pathname.includes('/labels'),
        })}
        to="/mappings/labels"
      >
        Labels
      </Link>
      <Link
        className={cn('flex w-28 justify-center p-3 duration-150', {
          'bolder-text text-primary': location.pathname.includes('/categories'),
          'hover:bolder-text hover:scale-105 hover:text-white':
            !location.pathname.includes('/categories'),
        })}
        to="/mappings/categories"
      >
        Categories
      </Link>
      <Link
        className={cn('flex w-28 justify-center p-3 duration-150', {
          ' bolder-text text-primary': location.pathname.includes('/brands'),
          'hover:bolder-text hover:scale-105 hover:text-white':
            !location.pathname.includes('/brands'),
        })}
        to="/mappings/brands"
      >
        Brands
      </Link>
      <div
        className={cn(
          'relative top-0 z-0 flex w-28 justify-center duration-300',
          {
            '-left-28': location.pathname.includes('/brands'),
            '-left-56': location.pathname.includes('/categories'),
            '-left-80 pr-8': location.pathname.includes('/labels'),
          }
        )}
      >
        <div className={cn('z-0 h-1.5 w-16 rounded-b-lg bg-primary')} />
      </div>
    </div>
  );
};

export default NavbarBottom;
