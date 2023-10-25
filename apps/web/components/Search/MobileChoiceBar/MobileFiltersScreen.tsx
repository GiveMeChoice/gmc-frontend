import cn from 'classnames';
import React from 'react';
import SearchChoiceBarFacetList from '../SearchChoiceBar/SearchChoiceBarFacetList';
import SearchChoiceBarFilterBox from '../SearchChoiceBar/SearchChoiceBarFilterBox';
import MobileFiltersHeader from './MobileFiltersHeader';
import { useShop } from '../../Context/ShopProvider';

interface Props {
  show: boolean;
  onClose: () => void;
}

const MobileFiltersScreen: React.FC<Props> = ({ show, onClose }) => {
  const shop = useShop();
  return (
    <div
      className={cn('transition-transform duration-300', {
        'translate-y-full md:hidden': !show,
        'fixed top-0 left-0 z-40 flex h-screen w-screen overscroll-none bg-white':
          show,
      })}
    >
      <div
        className={cn({
          'h-full': shop.response.hits,
          'h-fit': !shop.response.hits,
          'static flex h-fit w-full flex-col overflow-y-scroll overscroll-none bg-white':
            show,
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
