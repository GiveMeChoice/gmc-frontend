import { ISearchFunctionResponse } from 'gmc-types';
import { useRouter } from 'next/router';
import React from 'react';
import { LoadingSpinner } from 'ui';
import ChoiceBarSummarySortSwitch from './SearchChoiceBarSummary/ChoiceBarSummarySortSwitch';
import { useShop } from '../../Context/ShopProvider';

interface Props {}

const SearchChoiceBarSummary: React.FC<Props> = ({}) => {
  const router = useRouter();
  const shop = useShop();

  const handleSortChange = () => {};

  return (
    <div className="flex min-h-[160px] w-full flex-col  border-secondary-dark-10 bg-white px-8 pt-6">
      {shop.searching ? (
        // <div className="flex h-full w-full flex-col items-center justify-center gap-y-6">
        //   <LoadingSpinner style="h-14 fill-primary text-black" />
        //   <span className="text-2xl">Searching...</span>
        // </div>
        <span className="w-full pl-1.5 pb-8 text-4xl">Searching...</span>
      ) : (
        <>
          {shop.response.hits ? (
            <div className="flex h-full w-full flex-col gap-y-1">
              <span className="pl-1.5 pb-8 text-4xl">
                {shop.response.hits} Results
              </span>
              {/* <ChoiceBarSummaryBackButton compareModeOn={compareModeOn} removeCompareMode={removeCompareMode} /> */}
              {/* <div className="">
                <ChoiceBarSummaryViewSwitch
                  compareModeOn={compareModeOn}
                  toggleCompareMode={removeCompareMode}
                />
              </div> */}
              <div className="">
                <div className="m-1">
                  {/* <span className="text-sm">Sort By:</span> */}
                </div>
                <ChoiceBarSummarySortSwitch
                  searchResponse={shop.response}
                  onSortChange={handleSortChange}
                />
              </div>
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center">
              {router.query.q && (
                <span className="text-2xl">No Choices Found</span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchChoiceBarSummary;
