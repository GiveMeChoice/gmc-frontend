import React from 'react';
import cn from 'classnames';
import ChoiceBarSummarySortSwitch from '../SearchChoiceBar/SearchChoiceBarSummary/ChoiceBarSummarySortSwitch';
import { useShop } from '../../Context/ShopProvider';

interface Props {
  onClose: () => void;
}

const MobileFiltersHeader: React.FC<Props> = ({ onClose }) => {
  const shop = useShop();
  return (
    <div className="flex flex-col gap-y-6 border-y-1.5 border-zinc-700 p-5">
      <div className="flex w-full justify-between">
        <span className="pl-1.5 text-4xl">
          {shop.searching ? 'Searching...' : `${shop.response.hits} Results`}
        </span>
        <button
          className={cn(
            'flex aspect-square h-8 w-8 flex-col items-center justify-center rounded-full border-1.5 border-black bg-secondary pt-0.5 hover:scale-[1.03] hover:bg-secondary',
            {}
          )}
          onClick={onClose}
        >
          <div className="w-6 -translate-x-[0px] rotate-45 border-b-1.5 border-black" />
          <div className="w-6 translate-x-[0px] -translate-y-[2px] -rotate-45 border-b-1.5 border-black" />
        </button>
      </div>
      <ChoiceBarSummarySortSwitch
        searchResponse={shop.response}
        onSortChange={() => null}
      />
    </div>
  );
};

export default MobileFiltersHeader;
