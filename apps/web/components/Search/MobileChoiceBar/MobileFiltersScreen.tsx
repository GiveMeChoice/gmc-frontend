import cn from 'classnames';
import React from 'react';
import SearchChoiceBarFacetList from '../SearchChoiceBar/SearchChoiceBarFacetList';
import SearchChoiceBarFilterBox from '../SearchChoiceBar/SearchChoiceBarFilterBox';
import MobileFiltersHeader from './MobileFiltersHeader';

interface Props {
  show: boolean;
  onClose: () => void;
}

const MobileFiltersScreen: React.FC<Props> = ({ show, onClose }) => {
  return (
    <div
      className={cn('transition-transform duration-300', {
        'translate-y-full md:hidden': !show,
        'fixed top-0 left-0 z-40 flex h-screen w-screen overflow-y-scroll':
          show,
      })}
    >
      <div
        className={cn({
          'static h-full w-full justify-end bg-white': show,
          hidden: !show,
        })}
      >
        <MobileFiltersHeader onClose={onClose} />
        <SearchChoiceBarFilterBox />
        <SearchChoiceBarFacetList />
      </div>
    </div>
  );
};

export default MobileFiltersScreen;
