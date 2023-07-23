import { SearchFunctionFiltersDto, TermFacetDto } from 'gmc-types';
import React from 'react';
import cn from 'classnames';

interface Props {
  activeMerchantFilter?: string;
  merchantFacets: TermFacetDto[];
  onFilterChange: (updated: SearchFunctionFiltersDto) => void;
}

const SearchChoiceBarMerchantFacets: React.FC<Props> = ({
  activeMerchantFilter,
  merchantFacets,
  onFilterChange,
}) => {
  return (
    <div className="flex w-full flex-col divide-y divide-secondary-dark-10">
      <span className="pl-1.5 text-lg font-bold">Merchants</span>
      <div className="text-md flex flex-col px-2 pl-2.5 pt-0.5">
        {merchantFacets.map((merchant) => (
          <div className="flex items-center gap-x-1">
            {activeMerchantFilter === merchant.value && (
              <div className="h-2.5 w-2.5 rounded-full border border-zinc-900 bg-zinc-900" />
            )}
            <span
              className={cn(
                'cursor-pointer hover:underline active:text-primary-dark-10',
                {
                  'font-bold': activeMerchantFilter === merchant.value,
                }
              )}
              onClick={() =>
                onFilterChange({
                  merchant:
                    activeMerchantFilter === merchant.value
                      ? null
                      : merchant.value,
                })
              }
            >
              {`${merchant.value}`}&nbsp;&nbsp;
              <span className="text-sm">({`${merchant.count}`})</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchChoiceBarMerchantFacets;
