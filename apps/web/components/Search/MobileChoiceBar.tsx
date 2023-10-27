import Image from 'next/image';
import React, { useState } from 'react';
import { useShop } from '../Context/ShopProvider';
import MobileFiltersScreen from './MobileChoiceBar/MobileFiltersScreen';
import SearchChoiceBarFilterBox from './SearchChoiceBar/SearchChoiceBarFilterBox';

const MobileChoiceBar: React.FC = () => {
  const shop = useShop();

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="w-full border-b-1.5 border-zinc-700 px-6 pt-6 pb-9 md:hidden">
      <SearchChoiceBarFilterBox />

      {shop.searching && !showMobileFilters ? (
        <span className="w-full py-8 pl-1.5 text-4xl">Searching...</span>
      ) : (
        <div className="flex w-full items-start justify-between">
          <span className="pl-1.5 text-4xl">{shop.response.hits} Results</span>
          <MobileFiltersScreen
            show={showMobileFilters}
            onClose={() => {
              document.body.style.overflow = 'auto';
              setShowMobileFilters(false);
            }}
          />
          <div
            className="mt-1 flex items-center gap-x-2 rounded-full border-1.5 border-black px-[14px] pt-[6px] pb-[8px]"
            onClick={() => {
              setShowMobileFilters(true);
              document.body.style.overflow = 'hidden';
            }}
          >
            <Image
              draggable={false}
              src="/img/filters-icon.png"
              alt="Filters Icon"
              height={20}
              width={20}
            />
            <span className="text-[20px] leading-[1]">Filters</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileChoiceBar;
